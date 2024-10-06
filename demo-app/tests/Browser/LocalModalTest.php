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
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog[data-inertiaui-modal-index="1"]');
        });
    }
}
