<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Inertia\DeferProp;

class Support
{
    public static function isInertiaV1(): bool
    {
        return ! class_exists(DeferProp::class);
    }

    public static function isInertiaV2(): bool
    {
        return class_exists(DeferProp::class);
    }
}
