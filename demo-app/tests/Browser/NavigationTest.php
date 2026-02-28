<?php

it('closes the modal on navigation', function () {
    $user = nthUser(13);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users')
        ->waitForText($user->name)
        ->click("[data-testid='view-user-{$user->id}']")
        ->assertPathIs('/users/'.$user->id)
        ->back()
        ->assertPathIs('/users')
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->forward()
        ->assertPathIs('/users/'.$user->id);

    waitUntilMissingModal($page);
});
