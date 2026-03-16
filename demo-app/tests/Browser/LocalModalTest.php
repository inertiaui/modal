<?php

it('can open a local modal and a nested one', function () {
    $page = visit('/local')
        ->click('Open Local Modal')
        ->assertSeeIn('.im-modal-content', 'This is a local modal')
        ->click('Create Role')
        ->assertSeeIn('.im-dialog[data-inertiaui-modal-index="1"]', 'Create Role');

    clickModalCloseButton($page, 1);

    waitUntilMissingModal($page, 1);
});

it('can close a local modal through a template ref', function () {
    $page = visit('/local')
        ->click('Open Local Modal')
        ->assertSeeIn('.im-modal-content', 'This is a local modal')
        ->press('Close Modal through Ref');

    waitUntilMissingModal($page);
});
