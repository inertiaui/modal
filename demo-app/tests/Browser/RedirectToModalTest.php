<?php

use App\Models\User;
use Illuminate\Support\Str;

it('can open a page that redirects to a modal', function () {
    $page = visit('/visit')
        ->waitForText('Visit programmatically')
        ->click("[dusk='conditional-redirect']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->assertPathIs('/users/1/edit')
        ->assertSee('Visit programmatically') // Modal took Base URL from /visit page
        ->assertDontSeeIn('h2', 'Users'); // And not the Base URL from the Inertia::modal()->baseUrl() call

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertPathIs('/visit');
});

it('can submit a form and redirect back to the same modal', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users?navigate=1')
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', $newName = Str::random(10))
        ->press('Update and refresh')
        ->waitForText('User updated successfully!')
        ->assertSeeIn(modalSelector(), 'Edit User '.$newName)
        ->assertPathIs('/users/'.$firstUser->id.'/edit');

    test()->assertDatabaseHas('users', [
        'id' => $firstUser->id,
        'name' => $newName,
    ]);
});
