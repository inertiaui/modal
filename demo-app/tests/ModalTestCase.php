<?php

namespace Tests;

use InertiaUI\Modal\Support;

trait ModalTestCase
{
    public static function booleanProvider(): array
    {
        return [
            'true' => [true],
            'false' => [false],
        ];
    }

    public function isInertiaV2(): bool
    {
        return Support::isInertiaV2();
    }
}
