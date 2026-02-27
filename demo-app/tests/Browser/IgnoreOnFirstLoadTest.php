<?php

it('ignores props on first load when opening a modal from a base route', function (bool $navigate) {
    visit('/visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Visit programmatically')
        ->click("[data-testid='modal-props-ignore-first-load']")
        ->assertPresent(waitForModalSelector())
        // Deferred props should load (green text with random data)
        ->assertSeeIn("[data-testid='defer']", 'Deferred data')
        // Lazy data should not be loaded initially
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        // Optional props should load after pressing Make visible
        ->press('Make visible')
        ->assertSeeIn("[data-testid='optional']", 'Optional data');
})->with('navigate');

it('can lazily load props', function (bool $navigate) {
    visit('/visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Visit programmatically')
        ->click("[data-testid='modal-props-ignore-first-load']")
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        ->press('Load lazy')
        ->assertSeeIn("[data-testid='lazy']", 'Lazy data');
})->with('navigate');

it('ignores props on first load when opening a modal directly', function () {
    visit('/modal-props-ignore-first-load')
        ->assertPresent(waitForModalSelector())
        // Deferred props should load (green text with random data)
        ->assertSeeIn("[data-testid='defer']", 'Deferred data')
        // Lazy data should not be loaded initially
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        // Optional props should load after pressing Make visible
        ->press('Make visible')
        ->assertSeeIn("[data-testid='optional']", 'Optional data');
});

it('can lazily load props when opening a modal directly', function () {
    visit('/modal-props-ignore-first-load')
        ->assertPresent(waitForModalSelector())
        // Lazy Props
        ->assertSeeIn(modalSelector(), 'No lazy data loaded')
        ->press('Load lazy')
        ->assertSeeIn("[data-testid='lazy']", 'Lazy data');
});
