<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Routing\Router;
use Illuminate\Support\Arr;
use Symfony\Component\HttpFoundation\Response;

class DispatchBaseUrlRequest
{
    public function __construct(protected Router $router)
    {
        //
    }

    /**
     * Dispatch a new request, based on the original request, to the given base URL.
     */
    public function __invoke(Request $originalRequest, string $baseUrl): Response
    {
        $requestForBaseUrl = Request::create(
            $baseUrl,
            $originalRequest->getMethod(),
            $originalRequest->query->all(),
            $originalRequest->cookies->all(),
            $originalRequest->files->all(),
            $originalRequest->server->all(),
            $originalRequest->getContent()
        );

        $requestForBaseUrl->headers->replace($originalRequest->headers->all());
        $requestForBaseUrl->setRequestLocale($originalRequest->getLocale());
        $requestForBaseUrl->setDefaultRequestLocale($originalRequest->getDefaultLocale());

        $route = $this->router->getRoutes()->match($requestForBaseUrl);
        $requestForBaseUrl->setRouteResolver(fn () => $route);

        // No need to call setLaravelSession() as it's done by the StartSession middleware
        // No need to call setUserResolver() as it's done by AuthServiceProvider::registerRequestRebindHandler()

        // Dispatch the request without encrypting cookies because that has
        // already happens in the original request. We don't want to
        // double-encrypt them, as that would nullify the cookies.
        return $this->withoutEncryptingCookies($route, function () use ($requestForBaseUrl) {
            $response = app()->handle($requestForBaseUrl, Application::SUB_REQUEST);

            return $response instanceof Responsable
               ? $response->toResponse($requestForBaseUrl)
               : $response;
        });
    }

    /**
     * Run the given callback with the EncryptCookies middleware disabled.
     */
    private function withoutEncryptingCookies(Route $route, callable $callback): mixed
    {
        $middleware = $this->router->resolveMiddleware($route->gatherMiddleware());

        // Clear $route->computedMiddleware to force it to be recalculated
        // after removing the EncryptCookies middleware
        $route->flushController();

        // Store the original excluded middleware so we can restore it later
        $currentExcludedMiddleware = Arr::get($route->action, 'excluded_middleware', []);

        foreach ($middleware as $class) {
            if ($class === EncryptCookies::class || is_subclass_of($class, EncryptCookies::class)) {
                $route->withoutMiddleware($class);
            }
        }

        // Run the callback and restore the original excluded middleware
        return tap($callback(), fn () => $route->action['excluded_middleware'] = $currentExcludedMiddleware);
    }
}
