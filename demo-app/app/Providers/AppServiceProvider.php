<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Console\AboutCommand;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    const STACK_NAMES = [
        'vue' => 'Vue.js',
        'svelte' => 'Svelte',
        'react' => 'React.js',
        'react-18' => 'React.js',
        'react-19' => 'React.js',
    ];

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

            $stack = config('app.stack', 'react-19');
            AboutCommand::add('Inertia.js', 'Stack', self::STACK_NAMES[$stack]);
            AboutCommand::add('Inertia.js', 'Version', $installed['version'] ?? 'Not installed');
        }

        Model::unguard();
    }
}
