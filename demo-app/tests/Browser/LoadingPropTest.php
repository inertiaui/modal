<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class LoadingPropTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_indicates_when_a_modal_is_loading(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/loading-prop'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Loading Prop')
                ->clickLink('Open Slideover')
                ->assertSeeIn('@modal-link', 'Loading...')
                ->waitForModal()
                ->assertDontSeeIn('@modal-link', 'Loading...');
        });
    }
}
