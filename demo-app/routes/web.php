<?php

use App\Http\Middleware\TestHttpResponseMiddleware;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

$deferred = fn (string $data) => Inertia::defer(fn () => request()->header('X-InertiaUI-Modal-Base-Url')
    ? 'Deferred data with Base URL header: '.$data
    : 'Deferred data without Base URL header: '.$data
);

Route::get('/login', function () {
    Auth::loginUsingId(1);

    return redirect('/users');
});

Route::get('/conditionally-redirect', function () {
    if (request()->query('redirect')) {
        return redirect('/users/1/edit');
    }

    return Inertia::render('Users');
});

// Modal Events
Route::get('/modal-events', function (User $user) {
    return Inertia::modal('ModalEvents')->baseUrl('/users');
})->name('modal-events');

// Modal Props
Route::get('/modal-props-ignore-first-load', function () {
    $defer = fn (int $delay, string $data, string $group) => Inertia::defer(function () use ($delay, $data) {
        usleep($delay * 1000);

        return $data;
    }, $group);

    $optional = fn (int $delay, string $data) => Inertia::lazy(function () use ($delay, $data) {
        usleep($delay * 1000);

        return $data;
    });

    return Inertia::modal('ModalPropsIgnoreFirstLoad', [
        'deferA' => $defer(250, 'Deferred data A- '.Str::random(), 'group-a'),
        'deferB' => $defer(500, 'Deferred data B- '.Str::random(), 'group-b'),
        'optional' => $optional(500, 'Optional data - '.Str::random()),
        'lazy' => Inertia::lazy(function () {
            usleep(500 * 1000);

            return 'Lazy data - '.Str::random();
        }),
    ])->baseUrl('/visit');
});

// Edit a user
Route::get('/users/{user}/edit', function (User $user) {
    return Inertia::modal('EditUser', [
        'roles' => Role::pluck('name', 'id'),
        'user' => $user,
        'randomKey' => request()->input('fixedRandomKey') ?: request()->header('X-Random-Key') ?: Str::random(),
    ])->baseUrl('/users');
})->name('users.edit');

// Show a user
Route::get('/users/{user}', function (User $user) use ($deferred) {
    return Inertia::render('ShowUser', [
        'user' => $user,
        'deferred' => $deferred('users.show'),
    ]);
})->name('users.show');

// Update a user
Route::put('/users/{user}', function (User $user) {
    $user->update(request()->validate([
        'name' => 'required|string|min:3',
        'email' => 'required|email',
        'role_id' => 'required|exists:roles,id',
    ]));

    session()->flash('message', 'User updated successfully!');

    if (request()->query('redirect') === 'edit') {
        return redirect()->route('users.edit', $user);
    }

    return back();
})->name('users.update');

// Create a new role
Route::get('/roles/create', fn () => Inertia::modal('CreateRole', [
    'name' => 'Test Name',
    'headerValue' => request()->header('X-Test-Header'),
]))->name('roles.create');

// Store a new role
Route::post('/roles', function () {
    Role::create(request()->validate([
        'name' => 'required',
    ]));

    session()->flash('message', 'Role created successfully!');

    return back();
})->name('roles.store');

// Middleware compatibility test
Route::middleware([TestHttpResponseMiddleware::class])->get('/middleware-compatibility', function () {
    return Inertia::render('MiddlewareCompatibility/Index');
})->name('middleware-compatibility.index');

Route::middleware([TestHttpResponseMiddleware::class])->get('/middleware-compatibility/form', function () {
    return Inertia::modal('MiddlewareCompatibility/Form')->baseRoute('middleware-compatibility.index');
});

// POST route that returns Modal
Route::post('/data', function () {
    return inertia('Data', [
        'message' => request()->input('message'),
    ]);
});

// Test redirect()->back() behavior (for issue #153)
Route::post('/test-redirect-back', function () {
    session()->flash('message', 'Redirect back worked correctly!');

    return back();
})->name('test-redirect-back');

// Test for issue #115: Base URL returns another modal (should not cause infinite recursion)
Route::get('/modal-with-modal-base', function () {
    return Inertia::modal('EditUser', [
        'user' => User::first(),
        'roles' => Role::pluck('name', 'id'),
        'randomKey' => 'test',
    ])->baseUrl('/users/1/edit'); // Base URL points to another modal
})->name('modal-with-modal-base');

// Test for issue #134: Invalid modal response (simulates session expiration)
Route::get('/modal-invalid-response', function () {
    // Simulate what happens when session expires: redirect to login instead of modal response
    return redirect('/login');
})->name('modal-invalid-response');

// Test that checks if X-InertiaUI-Modal-Base-Url header is sent (for issue #153)
Route::post('/test-modal-header-check', function () {
    $hasModalHeader = request()->hasHeader('X-InertiaUI-Modal');
    $hasBaseUrlHeader = request()->hasHeader('X-InertiaUI-Modal-Base-Url');
    $baseUrl = request()->header('X-InertiaUI-Modal-Base-Url');

    // If we have base URL header but no modal header, that's the bug!
    if (! $hasModalHeader && $hasBaseUrlHeader && $baseUrl) {
        session()->flash('message', "BUG: Base URL header sent without modal header: {$baseUrl}");
    } else {
        session()->flash('message', 'OK: No stale modal headers detected');
    }

    return back();
})->name('test-modal-header-check');

// General pages
Route::get('{page}', function ($page) use ($deferred) {
    if (request()->query('slow')) {
        sleep(1);
    }

    return inertia(Str::studly($page), [
        'deferred' => $deferred('page '.$page),
    ]);
})->name('page');
