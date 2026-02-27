<?php

use Illuminate\Support\Str;

it('can open a page that redirects to a modal', function () {
    $page = visit('/visit')
        ->waitForText('Visit programmatically')
        ->click("[data-testid='conditional-redirect']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/1/edit')
        ->assertSee('Visit programmatically') // Modal took Base URL from /visit page
        ->assertDontSeeIn('h2', 'Users'); // And not the Base URL from the Inertia::modal()->baseUrl() call

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertPathIs('/visit');
});

it('can submit a form and redirect back to the same modal', function () {
    $user = nthUser(6);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users?navigate=1')
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', $newName = Str::random(10))
        ->press('Update and refresh')
        ->waitForText('User updated successfully!')
        ->assertSeeIn(modalSelector(), 'Edit User '.$newName)
        ->assertPathIs('/users/'.$user->id.'/edit');

    test()->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => $newName,
    ]);
});
