<?php

use App\Models\Role;
use Illuminate\Support\Str;

it('maintains body scroll lock when opening nested modals', function (bool $navigate) {
    $user = firstUser();

    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector());

    // Check that body has scroll lock after first modal opens
    $overflow = $page->script('window.getComputedStyle(document.body).overflow');
    expect($overflow)->toBe('hidden');

    // Open nested modal
    $page->click('Add Role')
        ->assertPresent(waitForModalSelector(1));

    // Body should still have scroll lock after nested modal opens
    $overflow = $page->script('window.getComputedStyle(document.body).overflow');
    expect($overflow)->toBe('hidden');

    // Close nested modal
    clickModalCloseButton($page, 1);
    waitUntilMissingModal($page, 1);

    // Body should still have scroll lock (first modal still open)
    $overflow = $page->script('window.getComputedStyle(document.body).overflow');
    expect($overflow)->toBe('hidden');

    // Close first modal
    clickModalCloseButton($page, 0);
    waitUntilMissingModal($page, 0);

    // Body should no longer have scroll lock
    $overflow = $page->script('window.getComputedStyle(document.body).overflow');
    expect($overflow)->not->toBe('hidden');
})->with('navigate');

it('can open a second modal on top of the first one', function (bool $navigate) {
    $user = nthUser(7);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1))
        ->assertSeeIn('.im-dialog[data-inertiaui-modal-index="1"]', 'Create Role')
        // The first modal should be blurred
        ->assertAttributeContains(modalSelector().' .im-modal-wrapper', 'class', 'blur');

    clickModalCloseButton($page, 1);

    waitUntilMissingModal($page, 1)
        // The first modal should not be blurred anymore
        ->assertAttributeDoesntContain(modalSelector().' .im-modal-wrapper', 'class', 'blur')
        ->press('Save')
        ->assertDontSee('Edit User');

    waitUntilMissingModal($page);
})->with('navigate');

it('can refresh props after closing the second modal', function () {
    $newRoleName = Str::random();
    $user = nthUser(8);  // Use unique user to avoid parallel test conflicts

    $page = visit('/users')
        ->waitForText($user->name)
        ->click("[data-testid='edit-user-{$user->id}']")
        ->assertPresent(waitForModalSelector())
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1));

    // Type in the nested modal and press its save button
    $page->page()->locator(modalSelector(1).' input[name="name"]')->fill($newRoleName);
    $page->page()->locator(modalSelector(1).' button:has-text("Save")')->click();

    waitUntilMissingModal($page, 1);

    $newRole = Role::where('name', $newRoleName)->firstOr(
        fn () => test()->fail('New role was not saved.')
    );

    $page->select('role', $newRole->id)
        ->assertSelected('role', $newRole->id);
});
