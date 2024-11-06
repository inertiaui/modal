<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class HeaderTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_open_a_modal_with_a_custom_header(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/header'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Header')
                ->clickLink('Open Modal')
                ->waitForModal()
                ->assertSeeIn('@headerValue', 'Test Header Value');
        });
    }
}
