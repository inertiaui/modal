<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class FormTest extends DuskTestCase
{
    #[Test]
    public function it_can_submit_a_form_from_within_the_modal_and_show_the_validation_error()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->type('name', 'a')
                ->press('Save')
                ->waitForTextIn('.im-modal-content', 'The name field must be at least 3 characters.');
        });
    }

    #[Test]
    public function it_can_submit_a_form_a_redirect()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->type('name', $newName = Str::random(10))
                ->press('Save')
                ->waitForText('User updated successfully!')
                ->waitUntilMissing('.im-dialog')
                ->assertFragmentIsNot("edit-user-{$firstUser->id}")
                ->assertPathIs('/users');

            $this->assertDatabaseHas('users', [
                'id' => $firstUser->id,
                'name' => $newName,
            ]);
        });
    }
}
