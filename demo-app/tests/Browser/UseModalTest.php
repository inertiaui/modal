<?php

it('can inject the current modal context from a component', function () {
    $page = visit('/users/1/edit')
        ->waitForText(firstUser('name'))
        ->assertPresent(waitForModalSelector())
        ->assertSeeIn(modalSelector(), 'Close Modal with index 0')
        ->click('Add Role')
        ->assertPresent(waitForModalSelector(1))
        ->assertSeeIn(modalSelector(1), 'Close Modal with index 1')
        ->press('Close Modal with index 1');

    waitUntilMissingModal($page, 1);
});
