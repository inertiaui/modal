<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Testing\Assert;
use Laravel\Dusk\Browser as DuskBrowser;

class Browser extends DuskBrowser
{
    /**
     * Get the first user from the database, ordering by name.
     */
    public function firstUser(?string $attribute = null, string $orderBy = 'name'): mixed
    {
        $firstUser = User::query()->orderBy($orderBy)->first();

        return $firstUser && $attribute ? $firstUser->{$attribute} : $firstUser;
    }

    /**
     * Wait for the first user to become visible.
     */
    public function waitForFirstUser(string $orderBy = 'name'): static
    {
        return $this->waitForText($this->firstUser('name', $orderBy));
    }

    /**
     * Register a listener for the Inertia start event.
     */
    public function listenForInertiaRequestStart(bool $resetCount = true): static
    {
        return $this->tap(fn (self $browser) => $browser->script(<<<JS
window.inertiaStartEventRegistered = window.inertiaStartEventRegistered ?? false
window.inertiaStartCount = $resetCount ? 0 : (window.inertiaStartCount ?? 0)
if (!window.inertiaStartEventRegistered) {
    window.inertiaStartEventRegistered = true
    document.addEventListener('inertia:start', () => window.inertiaStartCount++)
}
JS));
    }

    /**
     * Assert that the Inertia request has started the given number of times.
     */
    public function assertInertiaRequestStartCount(int $count): static
    {
        return $this->assertScript("return window.inertiaStartCount === {$count}");
    }

    /**
     * Assert that the given class is present on the element matching the selector.
     */
    public function assertClassPresent(string $selector, string $class): static
    {
        $element = $this->resolver->findOrFail($selector);

        Assert::assertTrue(
            collect($element->getAttribute('class'))
                ->flatMap(fn (string $class) => explode(' ', $class))
                ->map(fn (string $class) => trim($class))
                ->contains($class),
            "Element [{$selector}] does not have the class [{$class}]."
        );

        return $this;
    }

    /**
     * Click at the given coordinates.
     */
    public function clickAt(int $x, int $y): self
    {
        $this->driver->action()
            ->moveByOffset($x, $y)
            ->click()
            ->perform();

        return $this;
    }

    /**
     * Get the console log from the browser.
     */
    public function getConsoleLog(): array
    {
        return $this->driver->manage()->getLog('browser');
    }

    /**
     * Determine if the console log contains the given message.
     */
    private function consoleLogContains(string $needle): bool
    {
        return collect($this->getConsoleLog())->contains(function (array $entry) use ($needle) {
            // E.g.: http://[::1]:5173/@vite/client 494:8 "[vite] connecting..."
            preg_match('/^.*\d+:\d+\s"(.+)"$/', $entry['message'], $matches);

            return ! empty($matches)
                ? str_contains($matches[1] ?? '', $needle)
                : false;
        });
    }

    /**
     * Assert that the console log contains the given message.
     */
    public function assertConsoleLogContains(string $needle): self
    {
        Assert::assertTrue(
            $this->consoleLogContains($needle),
            "The console log does not contain the expected message: {$needle}"
        );

        return $this;
    }

    /**
     * Wait for the console log to contain the given message.
     */
    public function waitForConsoleLog(string $needle, ?int $seconds = null, int $interval = 100): self
    {
        return $this->waitUsing(
            $seconds,
            $interval,
            fn () => $this->consoleLogContains($needle),
            "The console log does not contain the expected message: {$needle}"
        );
    }
}
