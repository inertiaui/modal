<?php

use App\Models\User;

it('can perform a partial request on a base url', function (bool $navigate) {
    $firstUser = User::orderBy('name')->first();

    // In v2, we always use XHR mode + router.push with preserveState: true
    // This means the base component doesn't re-render when opening a modal,
    // so deferred data is NOT re-fetched (stays "without Base URL header")
    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($firstUser->name)
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: page users')
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        // Deferred data isn't re-fetched because base component doesn't re-render
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: page users');

    if ($navigate) {
        $page->assertPathIs('/users/'.$firstUser->id.'/edit');
    }

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: page users')
        ->assertPathIs('/users');
})->with('navigate');

it('can perform a partial request on a base url when visiting the modal url directly', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit("/users/{$firstUser->id}/edit")
        ->waitForText($firstUser->name)
        ->assertPresent(waitForModalSelector())
        // Wait for deferred data to load (may take longer in CI)
        ->waitForText('Deferred data with Base URL header: page users')
        ->assertSeeIn("[dusk='deferred']", 'Deferred data with Base URL header: page users')
        ->assertPathIs('/users/'.$firstUser->id.'/edit');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: page users')
        ->assertPathIs('/users');
});

it('can perform a partial request on a different base url', function () {
    $firstUser = User::orderBy('name')->first();

    // In v2, we always use XHR mode + router.push with preserveState: true
    // This means the base component doesn't re-render when opening a modal,
    // so deferred data is NOT re-fetched (stays "without Base URL header")
    $page = visit('/users/'.$firstUser->id)
        ->waitForText($firstUser->name)
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: users.show')
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        // Deferred data isn't re-fetched because base component doesn't re-render
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: users.show')
        ->assertPathIs('/users/'.$firstUser->id.'/edit');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[dusk='deferred']", 'Deferred data without Base URL header: users.show')
        ->assertPathIs('/users/'.$firstUser->id);
});
