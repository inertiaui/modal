<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }
}

/**
 * Test case for browser tests.
 *
 * Browser tests run against a real HTTP server that doesn't share database transactions.
 * The seeding migration ensures data is available for browser tests.
 * Do NOT use RefreshDatabase as transactions are not visible to the HTTP server.
 *
 * Note: Unlike regular tests, browser tests need Vite assets to be built
 * since Vue/React needs to actually run in the browser.
 */
abstract class BrowserTestCase extends BaseTestCase
{
    use CreatesApplication;
}
