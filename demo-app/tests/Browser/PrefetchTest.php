<?php

it('prefetches on mount and fires callbacks', function () {
    // Visit the page - prefetch="mount" link should trigger prefetching immediately
    $page = visit('/prefetch')
        ->waitForText('Prefetch Test')
        // Wait for the mount prefetch to complete
        ->waitForText('mount-prefetched');

    // Verify the prefetching and prefetched callbacks were fired
    $page->assertSeeIn("[dusk='log']", 'mount-prefetching')
        ->assertSeeIn("[dusk='log']", 'mount-prefetched');
});

it('prefetches on hover and fires callbacks', function () {
    $page = visit('/prefetch')
        ->waitForText('Prefetch Test');

    // Hover over the prefetch-hover link and wait a moment for the 75ms delay
    $page->hover("[dusk='prefetch-hover']");

    // Wait for the prefetch to complete
    $page->waitForText('prefetched');

    // Verify the prefetching and prefetched callbacks were fired
    $page->assertSeeIn("[dusk='log']", 'prefetching')
        ->assertSeeIn("[dusk='log']", 'prefetched');

    // Click to open the modal - it should use the cached response
    $page->click("[dusk='prefetch-hover']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User');
});

it('opens modal after clicking prefetch link', function () {
    $page = visit('/prefetch')
        ->waitForText('Prefetch Test');

    // Click the prefetch-click link - this should prefetch on mousedown then open
    $page->click("[dusk='prefetch-click']");

    // Wait for modal to open
    $page->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Edit User');

    // The click-success callback should have fired
    $page->assertSeeIn("[dusk='log']", 'click-success');
});
