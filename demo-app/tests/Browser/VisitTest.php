<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class VisitTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_programmatically_visit_a_local_modal(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {

            $browser->visit('/visit'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Visit programmatically')
                ->press('Open Local Modal')
                ->waitForModal()
                ->assertSeeIn('.im-modal-content', 'Hi there!');
        });
    }

    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_programmatically_visit_a_modal(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {

            $browser->visit('/visit'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Visit programmatically')
                ->press('Open Route Modal')
                ->waitForModal()
                ->assertSeeIn('.im-modal-content', 'Hi again!');
        });
    }

    #[Test]
    public function it_can_programmatically_visit_a_modal_and_use_browser_navigation()
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('/visit')
                ->waitForText('Visit programmatically')
                ->press('Open Route Modal With Navigate')
                ->waitForModal()
                ->assertPathIs('/users/1/edit')
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->waitForLocation('/visit');
        });
    }
}
