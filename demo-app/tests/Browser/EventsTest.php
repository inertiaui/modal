<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class EventsTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_attach_listeners_to_the_modal_link(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/events'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Events')
                ->clickLink('Open Modal')
                ->waitForModal()
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->assertSeeIn('@log', 'start,success,close,after-leave');
        });
    }

    #[Test]
    public function it_can_attach_listeners_to_the_modal_component()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/modal-events')
                ->waitForConsoleLog('success')
                ->waitForModal()
                ->clickLink('Create role')
                ->waitForConsoleLog('blur')
                ->waitForModal(1)
                ->clickModalCloseButton(1)
                ->waitForConsoleLog('focus')
                ->clickModalCloseButton()
                ->waitForConsoleLog('close');
        });
    }

    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_attach_a_listener_for_blur(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/events'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Events')
                ->clickLink('Open Modal')
                ->waitForModal()
                ->clickLink('Add Role')
                ->waitForModal(1)
                ->assertSeeIn('@log', 'start,success,blur')
                ->clickModalCloseButton(1)
                ->waitUntilMissingModal(1)
                ->assertSeeIn('@log', 'start,success,blur,focus');
        });
    }
}
