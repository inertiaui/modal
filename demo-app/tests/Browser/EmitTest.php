<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class EmitTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_dispatch_an_event_from_the_modal_to_the_modal_link(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users'.($navigate ? '?navigate=1' : ''))
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->clickLink('Send Message', 'button')
                ->assertDialogOpened('Hello from EditUser')
                ->dismissDialog();
        });
    }

    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_dispatch_events_back_and_forth_between_nested_modals(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $browser->visit('/emit'.($navigate ? '?navigate=1' : ''))
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
