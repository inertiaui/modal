<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as IlluminateResponse;
use Illuminate\Support\Facades\Response as ResponseFactory;
use Illuminate\View\View;
use Inertia\Response as InertiaResponse;
use Inertia\Support\Header;

class Modal implements Responsable
{
    const HEADER_MODAL = 'X-InertiaUI-Modal';

    const HEADER_BASE_URL = 'X-InertiaUI-Modal-Base-Url';

    const HEADER_USE_ROUTER = 'X-InertiaUI-Modal-Use-Router';

    /**
     * @var string The base URL for the modal.
     */
    protected ?string $baseUrl = null;

    /**
     * @var array<int, callable> Callbacks to run before the base URL is rerendered.
     */
    protected static array $beforeBaseRerenderCallbacks = [];

    public function __construct(protected string $component, protected array $props = [])
    {
        //
    }

    /**
     * Register a callback to run before the base URL is rerendered.
     */
    public static function beforeBaseRerender(callable $callback): void
    {
        static::$beforeBaseRerenderCallbacks[] = $callback;
    }

    /**
     * Set the base URL for the modal.
     */
    public function baseUrl(string $baseUrl): static
    {
        $this->baseUrl = $baseUrl;

        return $this;
    }

    /**
     * Set the base URL for the modal using a named route.
     */
    public function baseRoute(string $name, array $parameters = []): static
    {
        $this->baseUrl = route($name, $parameters);

        return $this;
    }

    /**
     * Get the base URL for the modal.
     */
    public function getBaseUrl(): ?string
    {
        return $this->baseUrl;
    }

    /**
     * Resolve the base URL for the modal.
     *
     * Used to render the 'background' page as well as where to redirect after closing the modal.
     */
    public function resolveBaseUrl(Request $request): ?string
    {
        return $request->header(self::HEADER_BASE_URL, $this->getBaseUrl());
    }

    /**
     * Create an HTTP response with either the modal or the modal's base URL with the modal data.
     */
    public function toResponse($request)
    {
        /** @var InertiaResponse $modal */
        $modal = inertia()->render($this->component, $this->props);

        $baseUrl = $this->resolveBaseUrl($request);

        if (in_array($request->header(self::HEADER_USE_ROUTER), [0, '0'], true) || blank($baseUrl)) {
            return $modal->toResponse($request);
        }

        inertia()->share('_inertiaui_modal', [
            // @phpstan-ignore-next-line
            ...$modal->toArray(),
            'id' => $request->header(static::HEADER_MODAL),
            'viaInertiaRouter' => (bool) $request->header(Header::INERTIA),
            'baseUrl' => $baseUrl,
        ]);

        $response = app(DispatchBaseUrlRequest::class)($request, $baseUrl);

        // Spoof the base URL to the modal's URL
        return match (true) {
            $response instanceof JsonResponse => $this->toJsonResponse($request, $response),
            $response instanceof IlluminateResponse => $this->toViewResponse($request, $response),
            default => $response,
        };
    }

    protected function toJsonResponse(Request $request, JsonResponse $response): JsonResponse
    {
        $data = $response->getData(true);

        return $response->setData([
            ...$data,
            'url' => $data['props']['_inertiaui_modal']['url'],
        ]);
    }

    protected function toViewResponse(Request $request, IlluminateResponse $response): IlluminateResponse
    {
        $originalContent = $response->getOriginalContent();

        if (! $originalContent instanceof View) {
            return $response;
        }

        $viewData = $originalContent->getData();
        $viewData['page']['url'] = $viewData['page']['props']['_inertiaui_modal']['url'];

        foreach (static::$beforeBaseRerenderCallbacks as $callback) {
            $callback($request, $response);
        }

        return ResponseFactory::view($originalContent->getName(), $viewData);
    }
}
