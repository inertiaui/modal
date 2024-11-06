<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class RedirectToModalTest extends DuskTestCase
{
    #[Test]
    public function it_can_submit_a_form_and_redirect_back_to_the_same_modal()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users?navigate=1')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->type('name', $newName = Str::random(10))
                ->press('Update and refresh')
                ->waitForText('User updated successfully!')
                ->withinModal(function (Browser $browser) use ($newName) {
                    $browser->assertSee('Edit User '.$newName);
                })
                ->assertPathIs('/users/'.$firstUser->id.'/edit');

            $this->assertDatabaseHas('users', [
                'id' => $firstUser->id,
                'name' => $newName,
            ]);
        });
    }
}
