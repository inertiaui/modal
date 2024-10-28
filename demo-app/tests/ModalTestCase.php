<?php

namespace Tests;

trait ModalTestCase
{
    public static function booleanProvider(): array
    {
        return [
            'true' => [true],
            'false' => [false],
        ];
    }
}
