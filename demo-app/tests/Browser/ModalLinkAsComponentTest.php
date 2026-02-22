<?php

it('can use a Vue component as the "as" prop for ModalLink', function (bool $navigate) {
    $firstUser = firstUser();

    visit('/users?'.($navigate ? 'navigate=1' : ''))
        ->waitForText($firstUser->name)
        // The custom button should be rendered with purple background
        ->assertPresent("[dusk='custom-button-user-{$firstUser->id}']")
        // Click the custom button to open the modal
        ->click("[dusk='custom-button-user-{$firstUser->id}']")
        ->assertPresent(waitForModalSelector())
        ->assertSee('Edit User');
})->with('navigate')->skip(fn () => config('app.stack') === 'react', 'Vue-specific feature');
