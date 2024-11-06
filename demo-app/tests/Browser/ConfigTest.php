<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class ConfigTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_passes_the_props_from_the_modal(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/props-from-modal'.($navigate ? '?navigate=1' : ''))
                ->waitForText('Prop from Modal')
                ->clickLink('Open Slideover')
                ->waitForModal()
                ->keys('', ['{escape}']) // Escape key does not close the dialog
                ->assertAttribute('#app', 'aria-hidden', 'true')
                ->clickLink('Open Slideover') // Clicking outside the dialog does not close it
                ->assertAttribute('#app', 'aria-hidden', 'true')
                ->assertPresent('.im-slideover-content')   // Slideover
                ->assertMissing('.im-close-button') // No close button
                ->assertAttributeContains('.im-slideover-positioner', 'class', 'justify-start') // Left-aligned
                ->assertAttributeContains('.im-slideover-content', 'class', 'p-8') // Padding classes
                ->assertAttributeContains('.im-slideover-content', 'class', 'bg-red-100') // Panel classes
                ->assertAttributeContains('.im-slideover-wrapper', 'class', 'lg:max-w-2xl'); // Max width
        });
    }
}
