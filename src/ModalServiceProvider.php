<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;
use Tighten\Ziggy\BladeRouteGenerator;

class ModalServiceProvider extends ServiceProvider
{
    /**
     * Boot the Inertia Modal package.
     */
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../config/inertiaui-modal.php' => config_path('inertiaui-modal.php'),
            ], 'config');
        }

        // Add a 'modal' macro to ResponseFactory for convenient modal creation
        // like Inertia::modal('Component', ['prop' => 'value'])
        ResponseFactory::macro('modal', fn ($component, $props = []): \InertiaUI\Modal\Modal => new Modal($component, $props));

        // Register a callback to reset the BladeRouteGenerator state before
        // rendering the Base Route/URL with the Modal component.
        Modal::beforeBaseRerender(function (): void {
            if (class_exists(BladeRouteGenerator::class)) {
                BladeRouteGenerator::$generated = false;
            }
        });

        // Add a 'toArray' macro to Response for consistent serialization to so that
        // any response can be serialized to an array. This is used in the Modal
        // class to pass the modal data as a prop to the base URL.
        Response::macro('toArray', function (): array {
            $request = app('request');

            return [
                'component' => $this->component,
                'props' => $this->props,
                'version' => $this->version,
                'url' => Str::start(Str::after($request->fullUrl(), $request->getSchemeAndHttpHost()), '/'),
            ];
        });

        $this->app->singleton('inertiaui_modal_redirector', function ($app): \InertiaUI\Modal\Redirector {
            $redirector = new Redirector($app['url']);

            // If the session is set on the application instance, we'll inject it into
            // the redirector instance. This allows the redirect responses to allow
            // for the quite convenient "with" methods that flash to the session.
            if (isset($app['session.store'])) {
                $redirector->setSession($app['session.store']);
            }

            return $redirector;
        });

        if (config('inertiaui-modal.bind_extended_redirector', true)) {
            // Replace Laravel's default Redirector with our custom one
            // This allows us to intercept and modify redirect behavior for modals,
            // ensuring that modal-specific redirects (like closing a modal) work correctly.
            $this->app->alias('inertiaui_modal_redirector', 'redirect');
        }
    }

    /**
     * Register the Inertia Modal package.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/inertiaui-modal.php', 'inertiaui-modal');
    }
}
