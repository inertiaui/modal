<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class UseModalTest extends DuskTestCase
{
    #[Test]
    public function it_can_inject_the_current_modal_context_from_a_component()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/users/1/edit')
                ->waitForFirstUser()
                ->waitForModal()
                ->withinModal(function (Browser $browser) {
                    $browser->assertSee('Close Modal with index 0');
                })
                ->clickLink('Add Role')
                ->waitForModal(1)
                ->withinModal(function (Browser $browser) {
                    $browser->assertSee('Close Modal with index 1');
                }, 1)
                ->press('Close Modal with index 1')
                ->waitUntilMissingModal(1);
        });
    }
}
