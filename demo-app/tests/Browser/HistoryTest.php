<?php

use Illuminate\Support\Str;

it('can open a modal and state it in the history', function () {
    $user = firstUser();

    $page = visit('/users?navigate=1')
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$user->id.'/edit')
        ->back();

    waitUntilMissingModal($page)
        ->assertPathIs('/users')
        ->assertQueryStringHas('navigate', '1')
        ->forward()
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$user->id.'/edit');
});

it('can redirect back to the same base route', function () {
    $user = nthUser(4);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users?navigate=1')
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$user->id.'/edit')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users');

    test()->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => $newName,
    ]);
});

it('can redirect back to a different base route', function () {
    $user = nthUser(5);  // Use unique user to avoid parallel test conflicts

    $page = visit("/users/{$user->id}")
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$user->id.'/edit')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users/'.$user->id);

    test()->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => $newName,
    ]);
});
