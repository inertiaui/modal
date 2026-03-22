<?php

use Illuminate\Support\Str;

it('can submit a form from within the modal and show the validation error', function (bool $navigate) {
    $user = nthUser(2);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', 'a')
        ->press('Save')
        ->assertSeeIn('.im-modal-content', 'The name field must be at least 3 characters.')
        ->assertSeeIn(modalSelector(), 'The name field must be at least 3 characters.')
        ->assertNotPresent('.im-dialog[data-inertiaui-modal-index="1"]');
})->with('navigate');

it('can submit a form and redirect', function (bool $navigate) {
    $user = nthUser(3);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users');

    test()->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => $newName,
    ]);
})->with('navigate');
