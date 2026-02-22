<?php

it('can open modal with custom middleware that expects http response', function () {
    $page = visit('/middleware-compatibility')
        ->waitForText('Middleware Compatibility Test')
        ->assertSee('This page tests that modals work correctly with custom middleware.')
        ->click('a[href="/middleware-compatibility/form"]')
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'This is my modal')
        ->assertSeeIn('.im-modal-content', 'Custom middleware is compatible!');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});
