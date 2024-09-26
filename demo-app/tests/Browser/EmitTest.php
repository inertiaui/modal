<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class EmitTest extends DuskTestCase
{
    #[Test]
    public function it_can_dispatch_an_event_from_the_modal_to_the_modal_link()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitFor('.im-dialog')
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->clickLink('Send Message', 'button')
                ->assertDialogOpened('Hello from EditUser.vue')
                ->dismissDialog();
        });
    }

    #[Test]
    public function it_can_dispatch_events_back_and_forth_between_nested_modals()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/emit')
                ->waitForText('Emit')
                ->clickLink('Open Modal')
                ->waitFor('.im-dialog')
                ->clickLink('Add Role')
                ->waitFor('.im-dialog[data-inertiaui-modal-index="1"]')
                ->clickLink('Push message to parent', 'button')
                ->waitForTextIn('@message', 'Hello from child')
                ->assertSeeIn('@greeting', 'Thanks from '.User::first()->name);
        });
    }
}
