<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class MethodTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_open_a_modal_with_a_custom_method_and_data(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/post-visit'.($navigate ? '?navigate=1' : ''))
                ->waitForText('POST Visit')
                ->clickLink('Open POST Modal')
                ->waitFor('.im-dialog')
                ->assertSeeIn('@message', 'Hey there!');
        });
    }
}
