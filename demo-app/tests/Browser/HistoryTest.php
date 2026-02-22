<?php

use App\Models\User;
use Illuminate\Support\Str;

it('can open a modal and state it in the history', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users?navigate=1')
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$firstUser->id.'/edit')
        ->back();

    waitUntilMissingModal($page)
        ->assertPathIs('/users')
        ->assertQueryStringHas('navigate', '1')
        ->forward()
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$firstUser->id.'/edit');
});

it('can redirect back to the same base route', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users?navigate=1')
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$firstUser->id.'/edit')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users');

    test()->assertDatabaseHas('users', [
        'id' => $firstUser->id,
        'name' => $newName,
    ]);
});

it('can redirect back to a different base route', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit("/users/{$firstUser->id}")
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/'.$firstUser->id.'/edit')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users/'.$firstUser->id);

    test()->assertDatabaseHas('users', [
        'id' => $firstUser->id,
        'name' => $newName,
    ]);
});
