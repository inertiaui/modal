<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class MethodTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_a_modal_with_a_custom_method_and_data()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/post-visit')
                ->waitForText('POST Visit')
                ->clickLink('Open POST Modal')
                ->waitFor('.im-dialog')
                ->assertSeeIn('@message', 'Hey there!');
        });
    }
}
