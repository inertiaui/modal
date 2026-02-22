<?php

it('indicates when a modal is loading', function (bool $navigate) {
    visit('/loading-prop'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Loading Prop')
        ->click('Open Slideover')
        ->assertSeeIn("[dusk='modal-link']", 'Loading...')
        ->assertPresent(waitForModalSelector())
        ->assertDontSeeIn("[dusk='modal-link']", 'Loading...');
})->with('navigate');
