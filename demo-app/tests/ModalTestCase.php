<?php

namespace Tests;

use Illuminate\Support\Facades\File;

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
        $installed = collect(File::json(base_path('vendor/composer/installed.json'))['packages'] ?? [])
            ->firstWhere('name', 'inertiajs/inertia-laravel');

        $version = $installed['version_normalized'] ?? null;

        return $version && version_compare($version, '2.0.0', '>=');
    }
}
