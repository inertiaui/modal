<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class DeferredOnBaseTest extends DuskTestCase
{
    #[Test]
    public function it_can_perform_a_partial_request_on_a_base_url()
    {
        if (! $this->isInertiaV2()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit("/users/{$firstUser->id}")
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->waitForTextIn('@deferred', 'Deferred data')
                ->assertPathIs('/users/'.$firstUser->id.'/edit');
        });
    }
}
