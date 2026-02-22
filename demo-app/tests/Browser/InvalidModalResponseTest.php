<?php

/**
 * Test for issue #134: Invalid modal response handling (e.g., session expiration).
 *
 * When a modal request returns an invalid response (like a redirect to login due to
 * session expiration), the system should handle it gracefully without crashing.
 */
it('handles invalid modal response gracefully without crashing', function (bool $navigate) {
    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText(firstUser()->name);

    // Click the link that will return an invalid modal response (redirect instead of modal)
    $page->click('a[href="/modal-invalid-response"]');

    // Wait a moment for the request to complete and any error handling to occur
    usleep(1000000);

    // The system should handle this gracefully - either:
    // 1. No modal opens and page remains functional, OR
    // 2. Page navigates due to redirect following (also acceptable)

    // In either case, we should see the Users page (since /login redirects back to /users)
    $page->assertSee('Users');

    // Verify no modal was opened (the invalid response should not create a modal)
    $page->assertNotPresent(modalSelector());

    // The page should be functional - verify we can still see user data
    $page->assertSee(firstUser()->name);
})->with('navigate');
