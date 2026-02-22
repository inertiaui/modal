<?php

use App\Models\User;
use Illuminate\Support\Str;

it('can submit a form from within the modal and show the validation error', function (bool $navigate) {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', 'a')
        ->press('Save')
        ->assertSeeIn('.im-modal-content', 'The name field must be at least 3 characters.')
        ->assertSeeIn(modalSelector(), 'The name field must be at least 3 characters.')
        ->assertNotPresent('.im-dialog[data-inertiaui-modal-index="1"]');
})->with('navigate');

it('can submit a form and redirect', function (bool $navigate) {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users');

    test()->assertDatabaseHas('users', [
        'id' => $firstUser->id,
        'name' => $newName,
    ]);
})->with('navigate');
