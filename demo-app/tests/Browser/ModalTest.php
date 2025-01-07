<?php

namespace Tests\Browser;

use App\Models\User;
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
}
