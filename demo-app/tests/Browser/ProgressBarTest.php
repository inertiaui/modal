<?php

namespace Tests\Browser;

use InertiaUI\Modal\Support;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class ProgressBarTest extends DuskTestCase
{
    #[Test]
    public function it_shows_the_inertia_progress_bar_after_delay()
    {
        if (Support::isInertiaV1()) {
            return $this->markTestSkipped('Proress Bar API not supported in Inertia v1');
        }

        $this->browse(function (Browser $browser) {
            $browser->visit('/loading-prop?delay=250')
                ->waitForText('Loading Prop')
                ->clickLink('Open Slideover')
                ->assertNotPresent('#nprogress')
                ->waitForModal();

            $browser->visit('/loading-prop?delay=250')
                ->waitForText('Loading Prop')
                ->clickLink('Open Slideover')
                ->pause(250)
                ->assertPresent('#nprogress')
                ->waitForModal()
                ->waitUntilMissing('#nprogress');
        });
    }

    #[Test]
    public function it_does_not_show_the_inertia_progress_bar_if_disabled()
    {
        if (Support::isInertiaV1()) {
            return $this->markTestSkipped('Proress Bar API not supported in Inertia v1');
        }

        $this->browse(function (Browser $browser) {
            $browser->visit('/loading-prop?progress=false')
                ->waitForText('Loading Prop')
                ->clickLink('Open Slideover')
                ->assertNotPresent('#nprogress')
                ->waitForModal();
        });
    }
}
