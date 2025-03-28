<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

class Support
{
    public static function isInertiaV2(): bool
    {
        return class_exists(DeferredProp::class);
    }
}
