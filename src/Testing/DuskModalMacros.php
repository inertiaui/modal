<?php

declare(strict_types=1);

namespace InertiaUI\Modal\Testing;

use Closure;
use Laravel\Dusk\Browser;

/** @mixin Browser */
class DuskModalMacros
{
    /**
     * Wait for the Modal to become visible.
     */
    public function waitForModal(): Closure
    {
        return fn (int $index = 0, ?int $seconds = null): Browser => $this->waitFor('.im-dialog[data-inertiaui-modal-index="'.$index.'"]', $seconds);
    }

    /**
     * Wait for the Modal to be removed.
     */
    public function waitUntilMissingModal(): Closure
    {
        return fn (int $index = 0, ?int $seconds = null): Browser => $this->waitUntilMissing('.im-dialog[data-inertiaui-modal-index="'.$index.'"]', $seconds);
    }

    /**
     * Execute a Closure with a scoped Modal instance.
     */
    public function withinModal(): Closure
    {
        return fn (Closure $callback, int $index = 0): Browser => $this->within('.im-dialog[data-inertiaui-modal-index="'.$index.'"]', $callback);
    }

    /**
     * Click the Modal close button.
     */
    public function clickModalCloseButton(): Closure
    {
        return fn (int $index = 0): Browser => $this->click('.im-dialog[data-inertiaui-modal-index="'.$index.'"] .im-close-button');
    }
}
