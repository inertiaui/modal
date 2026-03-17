<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

class Support
{
    public static function isInertiaV1(): bool
    {
        return ! class_exists(\Inertia\DeferProp::class);
    }

    public static function isInertiaV2(): bool
    {
        return class_exists(\Inertia\DeferProp::class) && ! static::isInertiaV3();
    }

    public static function isInertiaV3(): bool
    {
        return class_exists(\Inertia\PropsResolver::class);
    }
}
