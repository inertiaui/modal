<?php

namespace Tests;

use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverDimension;
use Illuminate\Support\Collection;
use Laravel\Dusk\TestCase as BaseTestCase;
use PHPUnit\Framework\Attributes\AfterClass;
use PHPUnit\Framework\Attributes\BeforeClass;
use Tests\Browser\Browser;

abstract class DuskTestCase extends BaseTestCase
{
    use CreatesApplication;
    use ModalTestCase;

    /**
     * Indicates if the browser should be across between test classes.
     */
    protected static bool $reuseBrowser = true;

    /**
     * Indicates if the browser shutdown has been registered.
     */
    protected static bool $reuseBrowserShutdownRegistered = false;

    /**
     * The initial window size.
     */
    protected static ?WebDriverDimension $initialWindowSize = null;

    /**
     * Prepare for Dusk test execution.
     */
    #[BeforeClass]
    public static function prepare(): void
    {
        if (! static::runningInSail()) {
            static::startChromeDriver(['--port=9515']);
        }
    }

    /**
     * {@inheritdoc}
     */
    public static function startChromeDriver(array $arguments = [])
    {
        if (static::$reuseBrowser && ! static::$reuseBrowserShutdownRegistered) {
            register_shutdown_function(function () {
                static::closeAll();
                parent::stopChromeDriver();
            });

            static::$reuseBrowserShutdownRegistered = true;
        }

        if (static::$reuseBrowser && static::$chromeProcess?->isRunning()) {
            return;
        }

        parent::startChromeDriver($arguments);
    }

    /**
     * {@inheritdoc}
     */
    public static function stopChromeDriver()
    {
        if (! static::$reuseBrowser) {
            parent::stopChromeDriver();
        }
    }

    /**
     * Tear down the Dusk test case class.
     *
     * @return void
     */
    #[AfterClass]
    public static function tearDownDuskClass()
    {
        if (! static::$reuseBrowser) {
            return parent::tearDownDuskClass();
        }

        static::closeAllButFirst();
        static::closeAllTabsButFirstOnFirstBrowser();

        foreach (static::$afterClassCallbacks as $callback) {
            $callback();
        }
    }

    /**
     * Close all of the browsers except the first one.
     *
     * @return void
     */
    public static function closeAllButFirst()
    {
        $browsers = collect(static::$browsers);

        if ($firstBrowser = $browsers->shift()) {
            $browsers->each->quit();

            static::$browsers = collect([$firstBrowser]);
        }
    }

    /**
     * Close all of the tabs except the first one on the first browser.
     *
     * @return void
     */
    public static function closeAllTabsButFirstOnFirstBrowser()
    {
        /** @var \Laravel\Dusk\Browser $firstBrowser */
        $firstBrowser = collect(static::$browsers)->first();

        if (! $firstBrowser) {
            return;
        }

        $driver = $firstBrowser->driver;
        $handles = collect($driver->getWindowHandles());

        if ($firstHandle = $handles->shift()) {
            // Close all tabs except the first one.
            $handles->each(function (string $handle) use ($driver) {
                $driver->switchTo()->window($handle);
                $driver->close();
            });

            // Switch back to the first window.
            $driver->switchTo()->window($firstHandle);

            // Restore the initial window size.
            $driver->manage()->window()->setSize(static::$initialWindowSize);

            // Clear all cookies.
            $driver->manage()->deleteAllCookies();

            // Clear all local storage.
            $driver->executeScript('window.localStorage.clear();');
        }
    }

    /**
     * Create the RemoteWebDriver instance.
     */
    protected function driver(): RemoteWebDriver
    {
        $options = (new ChromeOptions)->addArguments(collect([
            $this->shouldStartMaximized() ? '--start-maximized' : '--window-size=1920,1080',
            '--disable-search-engine-choice-screen',
        ])->unless($this->hasHeadlessDisabled(), function (Collection $items) {
            return $items->merge([
                '--disable-gpu',
                '--headless=new',
            ]);
        })->all());

        return RemoteWebDriver::create(
            $_ENV['DUSK_DRIVER_URL'] ?? 'http://localhost:9515',
            DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY, $options
            )
        );
    }

    /**
     * {@inheritdoc}
     */
    protected function newBrowser($driver)
    {
        return tap(new Browser($driver), function (Browser $browser) {
            // Save the initial window size so we can restore it later.
            static::$initialWindowSize ??= $browser->driver->manage()->window()->getSize();
        });
    }
}
