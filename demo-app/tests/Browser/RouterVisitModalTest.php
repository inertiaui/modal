<?php

// When navigate mode pushes a modal URL and the user refreshes, the server returns
// the modal component as the Inertia page (no base URL to fall back to).
// HeadlessModal must handle the missing modalContext gracefully.

it('does not crash when visiting a modal URL directly', function () {
    visit('/standalone-modal')
        ->assertNoJavaScriptErrors();
});
