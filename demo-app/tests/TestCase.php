<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Carbon;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public static function booleanProvider(): array
    {
        return [
            [true],
            [false],
        ];
    }

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        Carbon::setTestNow('2024-06-01 12:00:00');
    }

    public function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }
}
