<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class HistoryTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_a_modal_and_state_it_in_the_history()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users?navigate=1')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitFor('.im-modal-content')
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->assertRouteIs('users.edit', ['user' => $firstUser->id])
                ->back()
                ->waitUntilMissing('.im-dialog')
                ->waitForLocation('/users')
                ->assertQueryStringHas('navigate', '1')
                ->forward()
                ->waitFor('.im-modal-content')
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->assertRouteIs('users.edit', ['user' => $firstUser->id]);
        });
    }

    #[Test]
    public function it_can_redirect_back_to_the_same_base_route()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users?navigate=1')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->assertRouteIs('users.edit', ['user' => $firstUser->id])
                ->type('name', $newName = Str::random(10))
                ->press('Save')
                ->waitForText('User updated successfully!')
                ->waitUntilMissing('.im-dialog')
                ->assertPathIs('/users');

            $this->assertDatabaseHas('users', [
                'id' => $firstUser->id,
                'name' => $newName,
            ]);
        });
    }

    #[Test]
    public function it_can_redirect_back_to_a_different_base_route()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit("/users/{$firstUser->id}")
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->assertRouteIs('users.edit', ['user' => $firstUser->id])
                ->type('name', $newName = Str::random(10))
                ->press('Save')
                ->waitForText('User updated successfully!')
                ->waitUntilMissing('.im-dialog')
                ->assertPathIs('/users/'.$firstUser->id);

            $this->assertDatabaseHas('users', [
                'id' => $firstUser->id,
                'name' => $newName,
            ]);
        });
    }
}
