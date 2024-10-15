<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Symfony\Component\HttpFoundation\Response;

class DispatchBaseUrlRequest
{
    public function __construct(protected Router $router, protected Kernel $kernel)
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
        $requestForBaseUrl->setRouteResolver(fn () => $this->router->getRoutes()->match($requestForBaseUrl));

        // No need to call setLaravelSession() as it's done by the StartSession middleware
        // No need to call setUserResolver() as it's done by AuthServiceProvider::registerRequestRebindHandler()

        $response = $this->kernel->handle($requestForBaseUrl);

        $this->kernel->terminate($requestForBaseUrl, $response);

        return $response instanceof Responsable
            ? $response->toResponse($requestForBaseUrl)
            : $response;
    }
}
