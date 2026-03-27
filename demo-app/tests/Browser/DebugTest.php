<?php

it('debugs vue loading', function () {
    $page = visit('/users');
    sleep(2);

    $errors = $page->page()->evaluate('
        JSON.stringify({
            title: document.title,
            bodyText: document.body.innerText.substring(0, 200),
            consoleErrors: window.__consoleErrors || "none",
        }, null, 2)
    ');
    echo "\n=== Debug ===\n" . $errors . "\n";
});
