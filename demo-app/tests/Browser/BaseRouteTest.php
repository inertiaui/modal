<?php

namespace Tests\Browser;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class BaseRouteTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_a_modal_with_a_base_route()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit("/users/{$firstUser->id}/edit")
                ->waitForFirstUser()
                ->assertSeeIn('.im-modal-content', 'Edit User')
                ->assertPresent("@edit-user-{$firstUser->id}")
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog')
                ->waitForLocation('/users');
        });
    }

    #[Test]
    public function it_can_open_a_stacked_modal_on_top_of_a_modal_with_a_base_route()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = User::orderBy('name')->first();
            $newRoleName = Str::random();

            $browser->visit("/users/{$firstUser->id}/edit")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->clickLink('Add Role')
                ->waitFor('.im-dialog[data-inertiaui-modal-index="1"]')
                ->assertRouteIs('users.edit', ['user' => $firstUser->id])
                ->within('.im-dialog[data-inertiaui-modal-index="1"]', function (Browser $browser) use ($newRoleName) {
                    $browser->type('name', $newRoleName)->press('Save');
                })
                ->waitUntilMissing('.im-dialog[data-inertiaui-modal-index="1"]')
                ->within('.im-dialog[data-inertiaui-modal-index="0"]', function (Browser $browser) use ($newRoleName) {
                    $newRole = Role::where('name', $newRoleName)->firstOr(
                        fn () => $this->fail('New role was not saved.')
                    );

                    $browser->select('role', $newRole->id)
                        ->assertSelected('role', $newRole->id);
                });
        });
    }
}
