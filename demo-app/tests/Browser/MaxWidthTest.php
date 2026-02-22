<?php

it('can have a modal with different max widths', function (string $size, int $expectedWidth) {
    $page = visit('/max-width')
        ->resize(1680, 900)
        ->waitForText('Max Width')
        ->click("[dusk='modal-size-{$size}']")
        ->waitForText('Edit User');

    $width = $page->script("document.querySelector('body .im-modal-wrapper').offsetWidth");

    expect($width)->toBe($expectedWidth);
})->with('sizeAndPixels');

it('can have a slideover with different max widths', function (string $size, int $expectedWidth) {
    $page = visit('/max-width')
        ->resize(1680, 900)
        ->waitForText('Max Width')
        ->click("[dusk='slideover-size-{$size}']")
        ->waitForText('Edit User');

    $width = $page->script("document.querySelector('body .im-slideover-wrapper').offsetWidth");

    expect($width)->toBe($expectedWidth);
})->with('sizeAndPixels');

dataset('sizeAndPixels', [
    ['sm', 384],
    ['md', 448],
    ['lg', 512],
    ['xl', 576],
    ['2xl', 672],
    ['3xl', 768],
    ['4xl', 896],
    ['5xl', 1024],
    ['6xl', 1152],
    ['7xl', 1280],
]);
