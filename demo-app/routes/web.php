<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

// Edit a user
Route::get('/users/{user}/edit', function (User $user) {
    return inertia('EditUser', [
        'roles' => Role::pluck('name', 'id'),
        'user' => $user,
    ]);
})->name('users.edit');

// Update a user
Route::put('/users/{user}', function (User $user) {
    $user->update(request()->validate([
        'name' => 'required|string|min:3',
        'email' => 'required|email',
        'role_id' => 'required|exists:roles,id',
    ]));

    session()->flash('message', 'User updated successfully!');

    return redirect('/users');
})->name('users.update');

// Create a new role
Route::get('/roles/create', fn () => inertia('CreateRole', [
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

// General pages
Route::get('{page}', function ($page) {
    if (request()->query('slow')) {
        sleep(1);
    }

    return inertia(Str::studly($page));
});
