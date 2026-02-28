<?php

it('can have a backend prop called name', function (bool $navigate) {
    visit('/header'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Header')
        ->click('Open Modal')
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn("[data-testid='name']", 'Test Name');
})->with('navigate');
