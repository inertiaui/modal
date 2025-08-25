<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Pipeline;
use Illuminate\Routing\Route;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Facade;
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
            Request::METHOD_GET,
            $originalRequest->query->all(),
            $originalRequest->cookies->all(),
            $originalRequest->files->all(),
            $originalRequest->server->all(),
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
        $this->bindRequest($requestForBaseUrl);

        $response = (new Pipeline(app()))
            ->send($requestForBaseUrl)
            ->through($this->gatherMiddleware($route))
            ->then(function ($requestForBaseUrl) use ($route) {
                $this->bindRequest($requestForBaseUrl);

                $response = $route->run();
                
                if ($response instanceof Responsable) {
                    $response = $response->toResponse($requestForBaseUrl);
                }

                return $response;
            });

        return tap($response, fn () => $this->bindRequest($originalRequest));
    }

    /**
     * Bind the given request to the container and set it as the current request for the router.
     */
    private function bindRequest(Request $request): void
    {
        Facade::clearResolvedInstance('request');

        app()->instance('request', $request);

        // @phpstan-ignore-next-line
        $this->router->setCurrentRequest($request);
    }

    /**
     * Gather the middleware for the given route and exclude the configured middleware.
     */
    private function gatherMiddleware(Route $route): mixed
    {
        $excludedMiddleware = Modal::getMiddlewareToExcludeOnBaseUrl();

        return collect($this->router->gatherRouteMiddleware($route))
            ->reject(function ($middleware) use ($excludedMiddleware): bool {
                foreach ($excludedMiddleware as $excludeMiddleware) {
                    if ($middleware === $excludeMiddleware || is_subclass_of($middleware, $excludeMiddleware)) {
                        return true;
                    }
                }

                return false;
            })
            ->values()
            ->all();
    }
}
