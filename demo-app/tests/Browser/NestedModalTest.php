<?php

namespace Tests\Browser;

use App\Models\Role;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class NestedModalTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_a_second_modal_on_top_of_the_first_one()
    {
        $this->browse(function (Browser $browser) {
            $firstUser = $browser->firstUser();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitFor('.im-dialog')
                ->assertFragmentIs("edit-user-{$firstUser->id}")
                ->clickLink('Add Role')
                ->waitFor('.im-dialog[data-inertiaui-modal-index="1"]')
                ->assertSeeIn('.im-dialog[data-inertiaui-modal-index="1"]', 'Create Role')
                ->within('.im-dialog[data-inertiaui-modal-index="0"]', function (Browser $browser) {
                    // The first modal should be blurred
                    $browser->assertAttributeContains('.im-modal-wrapper', 'class', 'blur-sm');
                })
                ->assertFragmentIs("edit-user-{$firstUser->id}")
                ->click('.im-close-button')
                ->waitUntilMissing('.im-dialog[data-inertiaui-modal-index="1"]')
                ->within('.im-dialog[data-inertiaui-modal-index="0"]', function (Browser $browser) {
                    // The first modal should not be blurred anymore
                    $browser->assertAttributeDoesntContain('.im-modal-wrapper', 'class', 'blur-sm');
                })
                ->assertFragmentIs("edit-user-{$firstUser->id}");
        });
    }

    #[Test]
    public function it_can_refresh_props_after_closing_the_second_modal()
    {
        $this->browse(function (Browser $browser) {
            $newRoleName = Str::random();

            $browser->visit('/users')
                ->waitForFirstUser()
                ->click('@edit-user-'.$browser->firstUser()->id)
                ->waitFor('.im-dialog')
                ->clickLink('Add Role')
                ->waitFor('.im-dialog[data-inertiaui-modal-index="1"]')
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
