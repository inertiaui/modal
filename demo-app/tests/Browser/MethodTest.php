<?php

it('can open a modal with a custom method and data', function (bool $navigate) {
    visit('/post-visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('POST Visit')
        ->click('Open POST Modal')
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn("[dusk='message']", 'Hey there!');
})->with('navigate');
