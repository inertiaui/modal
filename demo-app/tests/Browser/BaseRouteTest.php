<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;

it('can open a modal with a base route', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit("/users/{$firstUser->id}/edit")
        ->assertSee($firstUser->name)
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPresent("[dusk='edit-user-{$firstUser->id}']");

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertPathIs('/users');
});

it('can open a stacked modal on top of a modal with a base route', function () {
    $firstUser = User::orderBy('name')->first();
    $newRoleName = Str::random();

    $page = visit("/users/{$firstUser->id}/edit")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1))
        ->assertPathIs('/users/'.$firstUser->id.'/edit');

    // Type in the nested modal and press its save button
    $page->page()->locator(modalSelector(1).' input[name="name"]')->fill($newRoleName);
    $page->page()->locator(modalSelector(1).' button:has-text("Save")')->click();

    waitUntilMissingModal($page, 1);

    $newRole = Role::where('name', $newRoleName)->firstOr(
        fn () => test()->fail('New role was not saved.')
    );

    $page->select('role', $newRole->id)
        ->assertSelected('role', $newRole->id);
});
