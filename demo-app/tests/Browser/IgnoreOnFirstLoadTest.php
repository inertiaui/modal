<?php

it('ignores props on first load when opening a modal from a base route', function (bool $navigate) {
    visit('/visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Visit programmatically')
        ->click("[dusk='modal-props-ignore-first-load']")
        ->assertPresent(waitForModalSelector())
        // Deferred props should load (green text with random data)
        ->assertSeeIn("[dusk='defer']", 'Deferred data')
        // Lazy data should not be loaded initially
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        // Optional props should load after pressing Make visible
        ->press('Make visible')
        ->assertSeeIn("[dusk='optional']", 'Optional data');
})->with('navigate');

it('can lazily load props', function (bool $navigate) {
    visit('/visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Visit programmatically')
        ->click("[dusk='modal-props-ignore-first-load']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        ->press('Load lazy')
        ->assertSeeIn("[dusk='lazy']", 'Lazy data');
})->with('navigate');

it('ignores props on first load when opening a modal directly', function () {
    visit('/modal-props-ignore-first-load')
        ->assertPresent(waitForModalSelector())
        // Deferred props should load (green text with random data)
        ->assertSeeIn("[dusk='defer']", 'Deferred data')
        // Lazy data should not be loaded initially
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        // Optional props should load after pressing Make visible
        ->press('Make visible')
        ->assertSeeIn("[dusk='optional']", 'Optional data');
});

it('can lazily load props when opening a modal directly', function () {
    visit('/modal-props-ignore-first-load')
        ->assertPresent(waitForModalSelector())
        // Lazy Props
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        ->press('Load lazy')
        ->assertSeeIn("[dusk='lazy']", 'Lazy data');
});
