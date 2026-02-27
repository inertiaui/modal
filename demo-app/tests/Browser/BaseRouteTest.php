<?php

use App\Models\Role;
use Illuminate\Support\Str;

it('can open a modal with a base route', function () {
    $user = firstUser();

    $page = visit("/users/{$user->id}/edit")
        ->assertSee($user->name)
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPresent("[data-testid='edit-user-{$user->id}']");

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertPathIs('/users');
});

it('can open a stacked modal on top of a modal with a base route', function () {
    $user = firstUser();
    $newRoleName = Str::random();

    $page = visit("/users/{$user->id}/edit")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1))
        ->assertPathIs('/users/'.$user->id.'/edit');

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
