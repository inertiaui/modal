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
                ->waitFor('.im-dialog')
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog')
                ->assertSeeIn('@log', 'start,success,close,after-leave');
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
                ->waitFor('.im-dialog')
                ->clickLink('Add Role')
                ->waitFor('.im-dialog[data-inertiaui-modal-index="1"]')
                ->assertSeeIn('@log', 'start,success,blur')
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog[data-inertiaui-modal-index="1"]')
                ->assertSeeIn('@log', 'start,success,blur,focus');
        });
    }
}
