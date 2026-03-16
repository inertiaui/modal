<?php

/**
 * Test for issue #115: Base URL returns another modal should not cause infinite recursion.
 *
 * When a modal's base URL route returns another Modal, the system should handle it
 * gracefully without creating an infinite loop of dispatch requests.
 */
it('handles modal with base URL that returns another modal without infinite recursion', function (bool $navigate) {
    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText(firstUser()->name);

    // This modal has a base URL that points to another modal route (/users/1/edit)
    // Without the fix, this would cause infinite recursion and timeout
    $page->click('a[href="/modal-with-modal-base"]')
        ->assertPresent(waitForModalSelector())
        ->assertSee('Edit User');

    // Close the modal
    clickModalCloseButton($page, 0);
    waitUntilMissingModal($page);
})->with('navigate');
