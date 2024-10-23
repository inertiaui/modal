<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Console\AboutCommand;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->runningInConsole()) {
            $installed = collect(File::json(base_path('vendor/composer/installed.json'))['packages'] ?? [])
                ->firstWhere('name', 'inertiajs/inertia-laravel');

            AboutCommand::add('Inertia.js', 'Stack', config('app.stack') === 'vue' ? 'Vue.js' : 'React.js');
            AboutCommand::add('Inertia.js', 'Version', $installed['version'] ?? 'Not installed');
        }

        Model::unguard();
    }
}
