<?php

it('can pass props to a local modal via visitModal', function () {
    $page = visit('/local-with-props')
        ->waitForText('Local Modal with Props')
        ->press("[dusk='open-with-props']")
        ->assertPresent(waitForModalSelector());

    // Assert the props were passed to the modal
    $page->assertSeeIn("[dusk='modal-message']", 'Hello from props!')
        ->assertSeeIn("[dusk='modal-count']", '42');
});
