<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class PropNameTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_have_a_backend_prop_called_name(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/header'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Header')
                ->clickLink('Open Modal')
                ->waitForModal()
                ->assertSeeIn('@name', 'Test Name');
        });
    }
}
