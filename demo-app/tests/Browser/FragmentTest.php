<?php

namespace Tests\Browser;

use App\Models\User;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class FragmentTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_the_modal_on_page_load()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/') // start on another page first
                ->visit('/users#edit-user-'.$firstUser->id)
                ->waitForFirstUser()
                ->waitFor('.im-dialog')
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog')
                ->assertFragmentIs('');
        });
    }
}
