<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class NavigationTest extends DuskTestCase
{
    #[Test]
    public function it_closes_the_modal_on_navigation()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click("@view-user-{$firstUser->id}")
                ->waitForLocation('/users/'.$firstUser->id)
                ->back()
                ->waitForLocation('/users')
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->forward()
                ->waitForLocation('/users/'.$firstUser->id)
                ->waitUntilMissingModal();
        });
    }
}
