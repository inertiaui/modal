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
 * Get the first user ordered by name.
 */
function firstUser(?string $attribute = null, string $orderBy = 'name'): mixed
{
    $user = User::query()->orderBy($orderBy)->first();

    return $user && $attribute ? $user->{$attribute} : $user;
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
 * Dataset for navigate parameter testing.
 */
dataset('navigate', [
    'navigate' => [true],
    'no navigate' => [false],
]);
