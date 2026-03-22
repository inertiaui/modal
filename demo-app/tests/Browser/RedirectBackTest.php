<?php

/**
 * Test for issue #153: redirect()->back() should use referer, not modal base URL
 * after a modal has been opened and closed.
 *
 * The bug was that after closing a modal, subsequent requests still sent the
 * X-InertiaUI-Modal-Base-Url header, causing redirect()->back() to use the
 * modal's base URL instead of the actual referer.
 */

// This test directly verifies that the stale modal header is NOT sent after modal close.
// Without the fix, the header would be sent even when no modal is open.
it('does not send stale modal base URL header after modal is closed', function (bool $navigate) {
    $user = nthUser(14);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText($user->name)
        // Open the modal
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSee('Edit User');

    // Close the modal without saving
    clickModalCloseButton($page, 0);
    waitUntilMissingModal($page);

    // Click the header check button - this verifies the header state
    // If the bug exists, we'll see "BUG: Base URL header sent without modal header"
    // If fixed, we'll see "OK: No stale modal headers detected"
    $page->click("[data-testid='test-modal-header-check']")
        ->waitForText('OK: No stale modal headers detected')
        ->assertPathIs('/users');
})->with('navigate');

// Test that navigating away also clears the stale header
it('does not use modal base URL for redirect back after modal is closed and navigated away', function (bool $navigate) {
    $user = nthUser(15);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText($user->name)
        // Open the modal
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSee('Edit User');

    // Close the modal without saving
    clickModalCloseButton($page, 0);
    waitUntilMissingModal($page);

    // Navigate to a different page (this should reset any modal state)
    $page->click("[data-testid='nav-visit']")
        ->waitForText('Visit Page')
        ->assertPathIs('/visit');

    // Small pause to ensure frontend state has fully reset after navigation
    usleep(100000); // 100ms

    // Now click the test redirect back button from the /visit page
    // This should redirect back to /visit (current page), NOT /users (modal base URL)
    $page->click("[data-testid='test-redirect-back']")
        ->waitForText('Redirect back worked correctly!')
        ->assertPathIs('/visit');
})->with('navigate');

// Simple test that verifies redirect back works from the same page
it('redirects back to current page after opening and closing modal', function (bool $navigate) {
    $user = nthUser(16);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText($user->name)
        // Open the modal
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSee('Edit User');

    // Close the modal without saving
    clickModalCloseButton($page, 0);
    waitUntilMissingModal($page);

    // Now click the test redirect back button
    // This should redirect back to /users
    $page->click("[data-testid='test-redirect-back']")
        ->waitForText('Redirect back worked correctly!')
        ->assertPathIs('/users');
})->with('navigate');
