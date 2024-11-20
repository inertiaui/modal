<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class LocalModalTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_a_local_modal_and_a_nested_one()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/local')
                ->clickLink('Open Local Modal')
                ->waitForTextIn('.im-modal-content', 'This is a local modal')
                ->clickLink('Create Role')
                ->waitForTextIn('.im-dialog[data-inertiaui-modal-index="1"]', 'Create Role')
                ->clickModalCloseButton(1)
                ->waitUntilMissingModal(1);
        });
    }

    #[Test]
    public function it_can_access_a_prop_through_a_template_ref()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/local')
                ->clickLink('Open Local Modal')
                ->waitForTextIn('.im-modal-content', 'This is a local modal')
                ->press('Alert Modal ID');

            $message = $browser->driver->switchTo()->alert()->getText();

            $this->assertStringStartsWith('inertiaui_modal_', $message);

            $browser->dismissDialog();
        });
    }

    #[Test]
    public function it_can_close_a_local_modal_through_a_template_ref()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/local')
                ->clickLink('Open Local Modal')
                ->waitForTextIn('.im-modal-content', 'This is a local modal')
                ->press('Close Modal through Ref')
                ->waitUntilMissingModal(1);
        });
    }
}
