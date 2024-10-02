<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class VisitTest extends DuskTestCase
{
    #[Test]
    public function it_can_programmatically_visit_a_local_modal()
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('/visit')
                ->waitForText('Visit programmatically')
                ->press('Open Local Modal')
                ->waitFor('.im-dialog')
                ->assertSeeIn('.im-modal-content', 'Hi there!');
        });
    }

    #[Test]
    public function it_can_programmatically_visit_a_modal()
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('/visit')
                ->waitForText('Visit programmatically')
                ->press('Open Route Modal')
                ->waitFor('.im-dialog')
                ->assertSeeIn('.im-modal-content', 'Hi again!');
        });
    }
}
