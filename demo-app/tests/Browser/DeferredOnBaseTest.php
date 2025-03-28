<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class DeferredOnBaseTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_perform_a_partial_request_on_a_base_url(bool $navigate)
    {
        if (! $this->isInertiaV2()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users'.($navigate ? '?navigate=1' : ''))
                ->waitForFirstUser()
                ->waitForTextIn('@deferred', 'Deferred data without Base URL header: page users')
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->waitForTextIn('@deferred', $navigate
                    ? 'Deferred data with Base URL header: page users'
                    : 'Deferred data without Base URL header: page users'
                );

            if ($navigate) {
                $browser->assertPathIs('/users/'.$firstUser->id.'/edit');
            }

            $browser->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->waitForTextIn('@deferred', 'Deferred data without Base URL header: page users')
                ->assertPathIs('/users');
        });
    }

    #[Test]
    public function it_can_perform_a_partial_request_on_a_base_url_when_visiting_the_modal_url_directly()
    {
        if (! $this->isInertiaV2()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit("/users/{$firstUser->id}/edit")
                ->waitForFirstUser()
                ->waitForModal()
                ->waitForTextIn('@deferred', 'Deferred data with Base URL header: page users')
                ->assertPathIs('/users/'.$firstUser->id.'/edit')
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->waitForTextIn('@deferred', 'Deferred data without Base URL header: page users')
                ->assertPathIs('/users');
        });
    }

    #[Test]
    public function it_can_perform_a_partial_request_on_a_different_base_url()
    {
        if (! $this->isInertiaV2()) {
            return $this->markTestSkipped('Deferred Props are only available in Inertia v2');
        }

        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users/'.$firstUser->id)
                ->waitForFirstUser()
                ->waitForTextIn('@deferred', 'Deferred data without Base URL header: users.show')
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->waitForTextIn('@deferred', 'Deferred data with Base URL header: users.show')
                ->assertPathIs('/users/'.$firstUser->id.'/edit')
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->waitForTextIn('@deferred', 'Deferred data without Base URL header: users.show')
                ->assertPathIs('/users/'.$firstUser->id);
        });
    }
}
