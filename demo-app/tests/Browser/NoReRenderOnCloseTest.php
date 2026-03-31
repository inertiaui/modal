<?php

it('does not re-render the background page when closing a modal in non-navigate mode', function () {
    $user = nthUser(8);

    $page = visit('/users')
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']");

    waitForModal($page);

    // Record the update count after modal is fully open
    $countBefore = $page->page()->evaluate('window.__pageUpdateCount ?? 0');

    clickModalCloseButton($page);
    waitUntilMissingModal($page);

    $countAfter = $page->page()->evaluate('window.__pageUpdateCount ?? 0');

    expect($countAfter)->toBe($countBefore);
});
