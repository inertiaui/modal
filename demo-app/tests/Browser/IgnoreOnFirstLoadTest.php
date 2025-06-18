<?php

namespace Tests\Browser;

use InertiaUI\Modal\Support;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class IgnoreOnFirstLoadTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_ignores_props_on_first_load_when_opening_a_modal_from_a_base_route(bool $navigate)
    {
        if (Support::isInertiaV1()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/visit'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Visit programmatically')
                ->click('@modal-props-ignore-first-load')
                ->waitForModal()
                ->withinModal(function (Browser $browser) {
                    // Deferred Props
                    $browser
                        ->assertSee('Loading defer...')
                        ->waitForTextIn('@defer', 'Deferred data');

                    // Optional Props
                    $browser
                        ->assertDontSee('Loading optional...')
                        ->press('Make visible')
                        ->assertSee('Loading optional...')
                        ->waitForTextIn('@optional', 'Optional data');

                    $optionalText = $browser->text('@optional');

                    // Try again...
                    $browser
                        ->press('Make invisible')
                        ->pause(50)
                        ->press('Make visible')
                        ->waitUntilMissingText($optionalText)
                        ->waitForTextIn('@optional', 'Optional data');
                });
        });
    }

    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_lazily_load_props(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/visit'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Visit programmatically')
                ->click('@modal-props-ignore-first-load')
                ->waitForModal()
                ->withinModal(function (Browser $browser) {
                    $browser
                        ->assertSee('No lazy data loaded')
                        ->press('Load lazy')
                        ->waitForTextIn('@lazy', 'Lazy data');

                    $lazyText = $browser->text('@lazy');

                    // Try again...
                    $browser
                        ->press('Load lazy')
                        ->waitUntilMissingText($lazyText)
                        ->waitForTextIn('@lazy', 'Lazy data');
                });
        });
    }

    #[Test]
    public function it_ignores_props_on_first_load_when_opening_a_modal_directly()
    {
        if (Support::isInertiaV1()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) {
            $browser->visit('/modal-props-ignore-first-load')
                ->waitForModal()
                ->withinModal(function (Browser $browser) {
                    // Deferred Props
                    $browser
                        ->assertSee('Loading defer...')
                        ->waitForTextIn('@defer', 'Deferred data');

                    // Optional Props
                    $browser
                        ->assertDontSee('Loading optional...')
                        ->press('Make visible')
                        ->assertSee('Loading optional...')
                        ->waitForTextIn('@optional', 'Optional data');

                    $optionalText = $browser->text('@optional');

                    // Try again...
                    $browser
                        ->press('Make invisible')
                        ->pause(50)
                        ->press('Make visible')
                        ->waitUntilMissingText($optionalText)
                        ->waitForTextIn('@optional', 'Optional data');
                });
        });
    }

    #[Test]
    public function it_can_lazily_load_props_when_opening_a_modal_directly()
    {
        if (Support::isInertiaV1()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) {
            $browser->visit('/modal-props-ignore-first-load')
                ->waitForModal()
                ->withinModal(function (Browser $browser) {
                    // Lazy Props
                    $browser
                        ->assertSee('No lazy data loaded')
                        ->press('Load lazy')
                        ->waitForTextIn('@lazy', 'Lazy data');

                    $lazyText = $browser->text('@lazy');

                    // Try again...
                    $browser
                        ->press('Load lazy')
                        ->waitUntilMissingText($lazyText)
                        ->waitForTextIn('@lazy', 'Lazy data');
                });
        });
    }
}
