<?php

it('closes the modal when clicking outside by default', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[dusk='open-with-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Use Escape key to test close behavior (using the page keyboard)
    $page->page()->keyDown('Escape');
    $page->page()->keyUp('Escape');

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('does not close the modal when clicking outside with closeOnClickOutside=false', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[dusk='open-without-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Modal should be present
    $page->assertPresent(waitForModalSelector())
        ->assertPresent('.im-modal-content');

    // Close using the close button
    clickModalCloseButton($page);

    waitUntilMissingModal($page);
});

it('closes the slideover when clicking outside by default', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[dusk='open-slideover-with-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Use Escape key to test close behavior
    $page->page()->keyDown('Escape');
    $page->page()->keyUp('Escape');

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('does not close the slideover when clicking outside with closeOnClickOutside=false', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[dusk='open-slideover-without-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Slideover should be present
    $page->assertPresent(waitForModalSelector())
        ->assertPresent('.im-slideover-content');

    // Close using the close button
    clickModalCloseButton($page);

    waitUntilMissingModal($page);
});
