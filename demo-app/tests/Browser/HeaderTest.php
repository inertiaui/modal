<?php

it('can open a modal with a custom header', function (bool $navigate) {
    visit('/header'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Header')
        ->click('Open Modal')
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn("[data-testid='headerValue']", 'Test Header Value');
})->with('navigate');
