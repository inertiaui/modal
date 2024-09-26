<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class HeaderTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_a_modal_with_a_custom_header()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/header')
                ->waitForText('Header')
                ->clickLink('Open Modal')
                ->waitFor('.im-dialog')
                ->assertSeeIn('@headerValue', 'Test Header Value');
        });
    }
}
