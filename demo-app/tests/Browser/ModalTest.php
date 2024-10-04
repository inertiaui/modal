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
                ->waitFor('.im-modal-content')
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog')
                ->assertMissing('#headlessui-portal-root');
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
                ->waitFor('.im-dialog')
                ->clickAt(100, 100)
                ->waitUntilMissing('.im-dialog')
                ->assertMissing('#headlessui-portal-root');
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
                ->waitFor('.im-dialog')
                ->press('Cancel')
                ->waitUntilMissing('.im-dialog')
                ->assertMissing('#headlessui-portal-root');
        });
    }
}
