<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class FormTest extends DuskTestCase
{
    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_submit_a_form_from_within_the_modal_and_show_the_validation_error(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users'.($navigate ? '?navigate=1' : ''))
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
                ->type('name', 'a')
                ->press('Save')
                ->waitForTextIn('.im-modal-content', 'The name field must be at least 3 characters.')
                ->within('.im-dialog[data-inertiaui-modal-index="0"]', function (Browser $browser) {
                    $browser->assertSee('The name field must be at least 3 characters.');
                })
                ->assertMissing('.im-dialog[data-inertiaui-modal-index="1"]');
        });
    }

    #[DataProvider('booleanProvider')]
    #[Test]
    public function it_can_submit_a_form_and_redirect(bool $navigate)
    {
        $this->browse(function (Browser $browser) use ($navigate) {
            $firstUser = User::orderBy('name')->first();

            $browser->visit('/users'.($navigate ? '?navigate=1' : ''))
                ->waitForFirstUser()
                ->click("@edit-user-{$firstUser->id}")
                ->waitForTextIn('.im-modal-content', 'Edit User')
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
}
