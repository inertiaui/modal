<?php

it('can perform a partial request on a base url', function (bool $navigate) {
    $user = nthUser(10);  // Use unique user to avoid parallel test conflicts

    // In v2, we always use XHR mode + router.push with preserveState: true
    // This means the base component doesn't re-render when opening a modal,
    // so deferred data is NOT re-fetched (stays "without Base URL header")
    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($user->name)
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: page users')
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        // Deferred data isn't re-fetched because base component doesn't re-render
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: page users');

    if ($navigate) {
        $page->assertPathIs('/users/'.$user->id.'/edit');
    }

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: page users')
        ->assertPathIs('/users');
})->with('navigate');

it('can perform a partial request on a base url when visiting the modal url directly', function () {
    $user = nthUser(11);  // Use unique user to avoid parallel test conflicts

    $page = visit("/users/{$user->id}/edit")
        ->waitForText($user->name)
        ->assertPresent(waitForModalSelector())
        // Wait for deferred data to load (may take longer in CI)
        ->waitForText('Deferred data with Base URL header: page users')
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data with Base URL header: page users')
        ->assertPathIs('/users/'.$user->id.'/edit');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: page users')
        ->assertPathIs('/users');
});

it('can perform a partial request on a different base url', function () {
    $user = nthUser(12);  // Use unique user to avoid parallel test conflicts

    // In v2, we always use XHR mode + router.push with preserveState: true
    // This means the base component doesn't re-render when opening a modal,
    // so deferred data is NOT re-fetched (stays "without Base URL header")
    $page = visit('/users/'.$user->id)
        ->waitForText($user->name)
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: users.show')
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        // Deferred data isn't re-fetched because base component doesn't re-render
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: users.show')
        ->assertPathIs('/users/'.$user->id.'/edit');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[data-testid='deferred']", 'Deferred data without Base URL header: users.show')
        ->assertPathIs('/users/'.$user->id);
});
