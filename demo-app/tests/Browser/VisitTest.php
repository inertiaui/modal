<?php

it('can programmatically visit a local modal', function (bool $navigate) {
    visit('/visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Visit programmatically')
        ->press('Open Local Modal')
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Hi there!');
})->with('navigate');

it('can programmatically visit a modal', function (bool $navigate) {
    visit('/visit'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Visit programmatically')
        ->press('Open Route Modal')
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn('.im-modal-content', 'Hi again!');
})->with('navigate');

it('can programmatically visit a modal and use browser navigation', function () {
    $page = visit('/visit')
        ->waitForText('Visit programmatically')
        ->press('Open Route Modal With Navigate')
        ->assertPresent(waitForModalSelector())
        ->assertPathIs('/users/1/edit');

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertPathIs('/visit');
});
