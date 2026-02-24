<?php

it('can open the modal and close it with the close button', function () {
    $firstUser = firstUser();

    $page = visit('/users')
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('can open the slideover and close it with the close button', function (bool $navigate) {
    $firstUser = firstUser();

    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($firstUser->name)
        ->click("[dusk='slideover-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-slideover-content', 'Edit User');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
})->with('navigate');

it('can close the modal by pressing Escape key', function () {
    $firstUser = firstUser();

    $page = visit('/users')
        ->resize(1024, 768)
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector());

    // Press Escape key using the page keyboard
    $page->page()->keyDown('Escape');
    $page->page()->keyUp('Escape');

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('can close the modal with a custom button', function () {
    $firstUser = firstUser();

    $page = visit('/users')
        ->resize(1024, 768)
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->press('Cancel');

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('can refetch the same base modal', function () {
    $firstUser = firstUser();

    $page = visit('/users?navigate=1')
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector());

    $randomKey = $page->text("[dusk='randomKey']");

    $page->click('Edit again!')
        ->assertDontSee($randomKey);

    $newRandomKey = $page->text("[dusk='randomKey']");

    expect($newRandomKey)->not->toBe($randomKey);
    expect($page->url())->toContain($randomKey);

    clickModalCloseButton($page);

    waitUntilMissingModal($page);

    // Small pause to ensure history state is fully settled before browser back
    usleep(300000); // 300ms

    $page->back()
        ->assertPresent(waitForModalSelector());

    expect($page->url())->toContain($randomKey);

    // Small pause before second browser back
    usleep(300000); // 300ms

    $page->back();

    waitUntilMissingModal($page)
        ->assertPathIs('/users');
})->skip('Flaky in CI due to browser history timing issues');

it('can reload with data and headers', function () {
    $firstUser = firstUser();

    $page = visit('/users?navigate=1')
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->press('Random Key from Data')
        ->assertSeeIn("[dusk='randomKey']", 'from-data')
        ->press('Random Key from Header')
        ->assertSeeIn("[dusk='randomKey']", 'from-header');
});
