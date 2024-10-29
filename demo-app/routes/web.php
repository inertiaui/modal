<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/login', function () {
    Auth::loginUsingId(1);

    return redirect('/users');
});

// Edit a user
Route::get('/users/{user}/edit', function (User $user) {
    return Inertia::modal('EditUser', [
        'roles' => Role::pluck('name', 'id'),
        'user' => $user,
    ])->baseUrl('/users');
})->name('users.edit');

// Show a user
Route::get('/users/{user}', function (User $user) {
    return Inertia::render('ShowUser', [
        'user' => $user,
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

// POST route that returns Modal
Route::post('/data', function () {
    return inertia('Data', [
        'message' => request()->input('message'),
    ]);
});

// General pages
Route::get('{page}', function ($page) {
    if (request()->query('slow')) {
        sleep(1);
    }

    return inertia(Str::studly($page));
});
