<?php

it('passes the props from the modal link', function (bool $navigate) {
    $page = visit('/props-from-modal-link'.($navigate ? '?navigate=1' : ''))
        ->waitForText('Prop from ModalLink')
        ->click('Edit User 1')
        ->assertPresent(waitForModalSelector());

    // Escape key does not close the dialog (closeExplicitly is true)
    $page->page()->keyDown('Escape');
    $page->page()->keyUp('Escape');

    // Modal should still be open with all the props applied
    $page->assertPresent('.im-slideover-content')   // Slideover
        ->assertNotPresent('.im-close-button') // No close button
        ->assertAttributeContains('.im-slideover-positioner', 'class', 'justify-start') // Left-aligned
        ->assertAttributeContains('.im-slideover-content', 'class', 'p-8') // Padding classes
        ->assertAttributeContains('.im-slideover-content', 'class', 'bg-red-100') // Panel classes
        ->assertAttributeContains('.im-slideover-wrapper', 'class', 'lg:max-w-2xl'); // Max width
})->with('navigate');
