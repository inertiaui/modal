<?php

it('indicates when a modal is loading', function (bool $navigate) {
    $page = visit('/loading-prop'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Loading Prop');

    // Before click
    $beforeClick = $page->page()->locator("[data-testid='modal-link']")->textContent();
    expect($beforeClick)->toBe('Open Slideover');

    // Set up a MutationObserver to catch the loading state before clicking
    $page->page()->evaluate("
        window.__loadingStateObserved = false;
        const link = document.querySelector('[data-testid=\"modal-link\"]');
        const observer = new MutationObserver(() => {
            if (link.textContent.includes('Loading')) {
                window.__loadingStateObserved = true;
            }
        });
        observer.observe(link, { childList: true, subtree: true, characterData: true });
    ");

    // Click the link
    $page->click('Open Slideover');

    // Wait for modal to appear (this happens after server responds)
    $page->assertPresent(waitForModalSelector());

    // Check if loading state was observed
    $foundLoading = $page->page()->evaluate('window.__loadingStateObserved');
    expect($foundLoading)->toBeTrue('Loading state was never visible');

    // After modal opens, loading should be done
    $page->assertDontSeeIn("[data-testid='modal-link']", 'Loading...');
})->with('navigate');
