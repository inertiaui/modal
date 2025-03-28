<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as IlluminateResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Response as ResponseFactory;
use Illuminate\View\View;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

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

    /**
     * @var array<string> Middleware to exclude when dispatching the base URL request.
     */
    protected static array $excludeMiddlewareOnBaseUrl = [];

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
     * Register middleware to exclude when dispatching the base URL request.
     */
    public static function excludeMiddlewareOnBaseUrl(array|string $middleware): void
    {
        static::$excludeMiddlewareOnBaseUrl = array_merge(static::$excludeMiddlewareOnBaseUrl, Arr::wrap($middleware));
    }

    /**
     * Get the middleware to exclude when dispatching the base URL request.
     */
    public static function getMiddlewareToExcludeOnBaseUrl(): array
    {
        return static::$excludeMiddlewareOnBaseUrl;
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
    public function baseRoute(\BackedEnum|string $name, mixed $parameters = [], bool $absolute = true): static
    {
        $this->baseUrl = route($name, $parameters, $absolute);

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
        return $request->header(self::HEADER_BASE_URL)
            ?? $request->header('referer')
            ?? $this->getBaseUrl();
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
            // Also used for reloading modal props...
            return $this->extractMeta($modal->toResponse($request));
        }

        inertia()->share('_inertiaui_modal', [
            // @phpstan-ignore-next-line
            ...($modalData = $modal->toArray()),
            'id' => $request->header(static::HEADER_MODAL),
            'baseUrl' => $baseUrl,
        ]);

        $response = app(DispatchBaseUrlRequest::class)($request, $baseUrl);

        // Spoof the base URL to the modal's URL
        return match (true) {
            $response instanceof JsonResponse => $this->toJsonResponse($response, $modalData['url']),
            $response instanceof IlluminateResponse => $this->toViewResponse($request, $response, $modalData['url']),
            default => $response,
        };
    }

    /**
     * Extract the meta data from the JSON response and set it in the 'meta' key.
     */
    protected function extractMeta(SymfonyResponse $response): SymfonyResponse
    {
        if (! $response instanceof JsonResponse) {
            return $response;
        }

        $data = $response->getData(true);
        $data['meta'] = [];

        foreach (['mergeProps', 'deferredProps', 'cache'] as $key) {
            if (! array_key_exists($key, $data)) {
                continue;
            }

            $data['meta'][$key] = $data[$key];
            unset($data[$key]);
        }

        if (empty($data['meta'])) {
            $data['meta'] = (object) [];
        }

        return $response->setData($data);
    }

    /**
     * Replace the URL in the JSON response with the modal's URL so the
     * Inertia front-end library won't redirect back to the base URL.
     */
    protected function toJsonResponse(JsonResponse $response, string $url): JsonResponse
    {
        return $response->setData([
            ...$response->getData(true),
            'url' => $url,
        ]);
    }

    /**
     * Replace the URL in the View Response with the modal's URL so the
     * Inertia front-end library won't redirect back to the base URL.
     */
    protected function toViewResponse(Request $request, IlluminateResponse $response, string $url): IlluminateResponse
    {
        $originalContent = $response->getOriginalContent();

        if (! $originalContent instanceof View) {
            return $response;
        }

        $viewData = $originalContent->getData();
        $viewData['page']['url'] = $url;

        foreach (static::$beforeBaseRerenderCallbacks as $callback) {
            $callback($request, $response);
        }

        return ResponseFactory::view($originalContent->getName(), $viewData);
    }
}
