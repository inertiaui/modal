<?php

it('can attach listeners to the modal link', function (bool $navigate) {
    $page = visit('/events'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Events')
        ->click('Open Modal')
        ->assertPresent(waitForModalSelector());

    clickModalCloseButton($page);

    waitUntilMissingModal($page)
        ->assertSeeIn("[dusk='log']", 'start,success,close,after-leave');
})->with('navigate');

it('can attach listeners to the modal component', function () {
    $page = visit('/modal-events')
        ->assertPresent(waitForModalSelector())
        ->click('Create role')
        ->assertPresent(waitForModalSelector(1));

    clickModalCloseButton($page, 1);

    waitUntilMissingModal($page, 1);

    clickModalCloseButton($page);

    waitUntilMissingModal($page);
});

it('can attach a listener for blur', function (bool $navigate) {
    $page = visit('/events'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Events')
        ->click('Open Modal')
        ->assertPresent(waitForModalSelector())
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1))
        ->assertSeeIn("[dusk='log']", 'start,success,blur');

    clickModalCloseButton($page, 1);

    waitUntilMissingModal($page, 1)
        ->assertSeeIn("[dusk='log']", 'start,success,blur,focus');
})->with('navigate');
