<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class LoadingPropTest extends DuskTestCase
{
    #[Test]
    public function it_indicates_when_a_modal_is_loading()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/loading-prop')
                ->waitForText('Loading Prop')
                ->clickLink('Open Slideover')
                ->assertSeeIn('@modal-link', 'Loading...')
                ->waitFor('.im-dialog')
                ->assertDontSeeIn('@modal-link', 'Loading...');
        });
    }
}
