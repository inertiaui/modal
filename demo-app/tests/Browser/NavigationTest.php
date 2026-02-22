<?php

use App\Models\User;

it('closes the modal on navigation', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users')
        ->waitForText($firstUser->name)
        ->click("[dusk='view-user-{$firstUser->id}']")
        ->assertPathIs('/users/'.$firstUser->id)
        ->back()
        ->assertPathIs('/users')
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->forward()
        ->assertPathIs('/users/'.$firstUser->id);

    waitUntilMissingModal($page);
});
