<?php

it('closes the modal when clicking outside by default', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[data-testid='open-with-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Click outside the modal to close it
    clickOutsideModal($page);

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('does not close the modal when clicking outside with closeOnClickOutside=false', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[data-testid='open-without-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Click outside the modal - should NOT close it
    clickOutsideModal($page);

    // Modal should still be present
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
        ->click("[data-testid='open-slideover-with-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Click outside the slideover to close it
    clickOutsideModal($page);

    waitUntilMissingModal($page)
        ->assertNotPresent('div[data-inertiaui-modal-id]');
});

it('does not close the slideover when clicking outside with closeOnClickOutside=false', function () {
    $page = visit('/close-on-click-outside')
        ->resize(1024, 768)
        ->waitForText('Close on Click Outside Test')
        ->click("[data-testid='open-slideover-without-click-outside']")
        ->assertPresent(waitForModalSelector());

    // Click outside the slideover - should NOT close it
    clickOutsideModal($page);

    // Slideover should still be present
    $page->assertPresent(waitForModalSelector())
        ->assertPresent('.im-slideover-content');

    // Close using the close button
    clickModalCloseButton($page);

    waitUntilMissingModal($page);
});
