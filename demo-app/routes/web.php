<?php

use App\Http\Middleware\TestHttpResponseMiddleware;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use InertiaUI\Modal\Support;

$deferred = fn (string $data) => Support::isInertiaV2()
    ? Inertia::defer(fn () => request()->header('X-InertiaUI-Modal-Base-Url')
        ? 'Deferred data with Base URL header: '.$data
        : 'Deferred data without Base URL header: '.$data
    )
    : 'Deferred not supported';

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
    $inertiaV2 = Support::isInertiaV2();

    $defer = fn (int $delay, string $data, string $group) => $inertiaV2
        ? Inertia::defer(function () use ($delay, $data) {
            usleep($delay * 1000);

            return $data;
        }, $group) : $data;

    $optional = fn (int $delay, string $data) => $inertiaV2
        ? Inertia::lazy(function () use ($delay, $data) {
            usleep($delay * 1000);

            return $data;
        }) : $data;

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

// General pages
Route::get('{page}', function ($page) use ($deferred) {
    if (request()->query('slow')) {
        sleep(1);
    }

    return inertia(Str::studly($page), [
        'deferred' => $deferred('page '.$page),
    ]);
})->name('page');
