<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class MaxWidthTest extends DuskTestCase
{
    #[Test]
    #[DataProvider('sizeAndPixels')]
    public function it_can_have_a_modal_with_different_max_widths($size, $expectedWidth)
    {
        $this->browse(function (Browser $browser) use ($size, $expectedWidth) {
            $browser->visit('/max-width')
                ->resize(1680, 900)
                ->waitForText('Max Width')
                ->click('@modal-size-'.$size)
                ->waitForText('Edit User');

            $width = $browser->script("return document.querySelector('body .im-modal-wrapper').offsetWidth")[0] ?? null;

            $this->assertEquals($expectedWidth, $width);
        });
    }

    #[Test]
    #[DataProvider('sizeAndPixels')]
    public function it_can_have_a_slideover_with_different_max_widths($size, $expectedWidth)
    {
        $this->browse(function (Browser $browser) use ($size, $expectedWidth) {
            $browser->visit('/max-width')
                ->resize(1680, 900)
                ->waitForText('Max Width')
                ->click('@slideover-size-'.$size)
                ->waitForText('Edit User');

            $width = $browser->script("return document.querySelector('body .im-slideover-wrapper').offsetWidth")[0] ?? null;

            $this->assertEquals($expectedWidth, $width);
        });
    }

    public static function sizeAndPixels()
    {
        return [
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
        ];
    }
}
