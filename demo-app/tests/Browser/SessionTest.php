<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class SessionTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_submit_a_form_and_redirect_and_keep_the_user_logged_in(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = User::orderBy('name')->first();

            $browser
                ->loginAs($firstUser)
                ->visit('/users'.($navigate ? '?navigate=1' : ''))
                ->waitForFirstUser()
                ->assertSee("Logged in as: {$firstUser->id}")
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->assertSee("Logged in as: {$firstUser->id}")
                ->type('name', $newName = Str::random(10))
                ->press('Save')
                ->waitForText('User updated successfully!')
                ->waitUntilMissingModal()
                ->assertPathIs('/users')
                ->assertSee("Logged in as: {$firstUser->id}")
                ->assertAuthenticatedAs($firstUser);

            $this->assertDatabaseHas('users', [
                'id' => $firstUser->id,
                'name' => $newName,
            ]);
        });
    }
}
