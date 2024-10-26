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
                ->waitFor('.im-dialog')
                ->within('.im-dialog[data-inertiaui-modal-index="0"]', function (Browser $browser) {
                    $browser->assertSee('Close Modal with index 0');
                })
                ->clickLink('Add Role')
                ->waitFor('.im-dialog[data-inertiaui-modal-index="1"]')
                ->within('.im-dialog[data-inertiaui-modal-index="1"]', function (Browser $browser) {
                    $browser->assertSee('Close Modal with index 1');
                })
                ->press('Close Modal with index 1')
                ->waitUntilMissing('.im-dialog[data-inertiaui-modal-index="1"]');
        });
    }
}
