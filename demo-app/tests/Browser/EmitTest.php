<?php

use App\Models\User;

it('can dispatch events back and forth between nested modals', function (bool $navigate) {
    visit('/emit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Emit')
        ->click('Open Modal')
        ->assertPresent(waitForModalSelector())
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1))
        ->click('Push message to parent')
        ->assertSeeIn("[data-testid='message']", 'Hello from child')
        ->assertSeeIn("[data-testid='greeting']", 'Thanks from '.User::first()->name);
})->with('navigate');
