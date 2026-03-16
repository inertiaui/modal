<?php

use Illuminate\Support\Str;

it('can submit a form and redirect', function (bool $navigate) {
    $user = nthUser(1);  // Use unique user to avoid parallel test conflicts

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
