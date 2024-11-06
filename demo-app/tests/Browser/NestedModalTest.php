<?php

namespace Tests\Browser;

use App\Models\Role;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class NestedModalTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_open_a_second_modal_on_top_of_the_first_one(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = $browser->firstUser();

            $browser->visit('/users?'.($navigate ? 'navigate=1' : ''))
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForModal()
                ->clickLink('Add Role')
                ->waitForModal(1)
                ->assertSeeIn('.im-dialog[data-inertiaui-modal-index="1"]', 'Create Role')
                ->withinModal(function (Browser $browser) {
                    // The first modal should be blurred
                    $browser->assertAttributeContains('.im-modal-wrapper', 'class', 'blur-sm');
                })
                ->clickModalCloseButton(1)
                ->waitUntilMissingModal(1)
                ->withinModal(function (Browser $browser) {
                    // The first modal should not be blurred anymore
                    $browser->assertAttributeDoesntContain('.im-modal-wrapper', 'class', 'blur-sm');
                })
                ->press('Save')
                ->waitUntilMissingText('Edit User')
                ->waitUntilMissingModal();
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
                ->waitForModal()
                ->clickLink('Add Role')
                ->waitForModal(1)
                ->withinModal(function (Browser $browser) use ($newRoleName) {
                    $browser->type('name', $newRoleName)->press('Save');
                }, 1)
                ->waitUntilMissingModal(1)
                ->withinModal(function (Browser $browser) use ($newRoleName) {
                    $newRole = Role::where('name', $newRoleName)->firstOr(
                        fn () => $this->fail('New role was not saved.')
                    );

                    $browser->select('role', $newRole->id)
                        ->assertSelected('role', $newRole->id);
                });
        });
    }
}
