<?php

it('can pass props to a local modal via visitModal', function () {
    $page = visit('/local-with-props')
        ->waitForText('Local Modal with Props')
        ->press("[data-testid='open-with-props']")
        ->assertPresent(waitForModalSelector());

    // Assert the props were passed to the modal
    $page->assertSeeIn("[data-testid='modal-message']", 'Hello from props!')
        ->assertSeeIn("[data-testid='modal-count']", '42');
});
