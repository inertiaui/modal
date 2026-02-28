<?php

use App\Models\User;
use Illuminate\Support\Carbon;
use Pest\Browser\Api\AwaitableWebpage;
use Pest\Browser\Api\Webpage;
use Tests\BrowserTestCase;
use Tests\TestCase;

pest()->extend(TestCase::class)->in('Feature', 'Unit');

pest()->extend(BrowserTestCase::class)
    ->beforeEach(fn () => Carbon::setTestNow('2024-06-01 12:00:00'))
    ->afterEach(fn () => Carbon::setTestNow())
    ->in('Browser');

/**
 * Get the selector for waiting for a modal to be fully entered.
 */
function waitForModalSelector(int $index = 0): string
{
    return ".im-dialog[data-inertiaui-modal-index=\"{$index}\"] div[data-inertiaui-modal-entered=\"true\"]";
}

/**
 * Get the modal container selector.
 */
function modalSelector(int $index = 0): string
{
    return ".im-dialog[data-inertiaui-modal-index=\"{$index}\"]";
}

/**
 * Get the close button selector for a modal.
 */
function closeButtonSelector(int $index = 0): string
{
    return ".im-dialog[data-inertiaui-modal-index=\"{$index}\"] .im-close-button";
}

/**
 * Get a user by offset (0-indexed), ordered by ID.
 * Using ID ordering ensures consistent results when tests modify user names in parallel.
 * Different tests should use different offsets to avoid conflicts in parallel execution.
 */
function nthUser(int $offset = 0, ?string $attribute = null): mixed
{
    $user = User::query()->orderBy('id')->offset($offset)->first();

    return $user && $attribute ? $user->{$attribute} : $user;
}

/**
 * Get the first user ordered by ID.
 * Using ID ordering (not name) ensures consistent results when tests modify user names in parallel.
 *
 * @deprecated Use nthUser() with different offsets for tests that modify data
 */
function firstUser(?string $attribute = null, string $orderBy = 'id'): mixed
{
    return nthUser(0, $attribute);
}

/**
 * Wait for a modal to be visible and fully entered (uses assertPresent which auto-waits).
 */
function waitForModal(Webpage|AwaitableWebpage $page, int $index = 0): Webpage|AwaitableWebpage
{
    return $page->assertPresent(waitForModalSelector($index));
}

/**
 * Wait for a modal to be removed (uses assertNotPresent which auto-waits).
 */
function waitUntilMissingModal(Webpage|AwaitableWebpage $page, int $index = 0): Webpage|AwaitableWebpage
{
    return $page->assertNotPresent(modalSelector($index));
}

/**
 * Click the modal close button.
 */
function clickModalCloseButton(Webpage|AwaitableWebpage $page, int $index = 0): Webpage|AwaitableWebpage
{
    return $page->click(closeButtonSelector($index));
}

/**
 * Click outside the modal content (on the modal container).
 * Uses dispatchEvent to trigger the mousedown.self handler directly.
 */
function clickOutsideModal(Webpage|AwaitableWebpage $page, int $index = 0): Webpage|AwaitableWebpage
{
    // Use JavaScript to dispatch a mousedown event on the container element itself
    // This simulates clicking on the container (not its children), triggering @mousedown.self
    $page->page()->evaluate('() => {
        const container = document.querySelector(".im-modal-container, .im-slideover-container");
        if (container) {
            const event = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
            container.dispatchEvent(event);
        }
    }');

    return $page;
}

/**
 * Dataset for navigate parameter testing.
 */
dataset('navigate', [
    'navigate' => [true],
    'no navigate' => [false],
]);
