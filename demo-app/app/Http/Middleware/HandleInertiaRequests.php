<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'navigate' => (bool) request()->query('navigate'),
            'random' => rand(1, 100_000),
            'users' => User::query()->orderBy('name')->get(),
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
