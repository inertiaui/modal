<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class ModalTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_the_modal_and_close_it_with_the_close_button()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->assertMissing('div[data-inertiaui-modal-id]');
        });
    }

    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_open_the_slideover_and_close_it_with_the_close_button(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users'.($navigate ? '?navigate=1' : ''))
                ->waitForFirstUser()
                ->click("@slideover-user-{$firstUser->id}")
                ->waitForModal()
                ->assertSeeIn('.im-slideover-content', 'Edit User')
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->assertMissing('div[data-inertiaui-modal-id]');
        });
    }

    #[Test]
    public function it_can_close_the_modal_by_clicking_outside_of_it()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->resize(1024, 768)
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->clickAt(100, 100)
                ->waitUntilMissingModal()
                ->assertMissing('div[data-inertiaui-modal-id]');
        });
    }

    #[Test]
    public function it_can_close_the_modal_with_a_custom_button()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->resize(1024, 768)
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->press('Cancel')
                ->waitUntilMissingModal()
                ->assertMissing('div[data-inertiaui-modal-id]');
        });
    }

    #[Test]
    public function it_can_refetch_the_same_base_modal()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users?navigate=1')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal();

            $randomKey = $browser->text('@randomKey');

            $browser->clickLink('Edit again!')
                ->waitUntilMissingText($randomKey);

            $newRandomKey = $browser->text('@randomKey');

            $this->assertNotEquals($randomKey, $newRandomKey);

            $url = $browser->driver->getCurrentURL();
            $this->assertStringContainsString($randomKey, $url);

            $browser->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->back()
                ->waitForModal();

            $url = $browser->driver->getCurrentURL();
            $this->assertStringContainsString($randomKey, $url);

            $browser->back()
                ->waitUntilMissingModal()
                ->assertRouteIs('page', ['page' => 'users']);
        });
    }

    #[Test]
    public function it_can_reload_with_data_and_headers()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users?navigate=1')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->press('Random Key from Data')
                ->waitForTextIn('@randomKey', 'from-data')
                ->press('Random Key from Header')
                ->waitForTextIn('@randomKey', 'from-header');
        });
    }
}
