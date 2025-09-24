<?php

namespace Tests\Browser;

use InertiaUI\Modal\Support;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class ProgressBarTest extends DuskTestCase
{
    #[Test]
    public function it_shows_the_inertia_progress_bar()
    {
        if (Support::isInertiaV1()) {
            return $this->markTestSkipped('Proress Bar API not supported in Inertia v1');
        }

        $this->browse(function (Browser $browser) {
            $browser->visit('/loading-prop')
                ->waitForText('Loading Prop')
                ->clickLink('Open Slideover')
                ->assertPresent('#nprogress')
                ->waitForModal()
                ->waitUntilMissing('#nprogress');
        });
    }
}
