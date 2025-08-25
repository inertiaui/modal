<?php

namespace Tests\Browser;

use PHPUnit\Framework\Attributes\Test;
use Tests\DuskTestCase;

class MiddlewareCompatibilityTest extends DuskTestCase
{
    #[Test]
    public function it_can_open_modal_with_custom_middleware_that_expects_http_response()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/middleware-compatibility')
                ->assertSee('Middleware Compatibility Test')
                ->assertSee('This page tests that modals work correctly with custom middleware.')
                ->click('a[href="/middleware-compatibility/form"]')
                ->waitForModal()
                ->assertSeeIn('.im-modal-content', 'This is my modal')
                ->assertSeeIn('.im-modal-content', 'Custom middleware is compatible!')
                ->clickModalCloseButton()
                ->waitUntilMissingModal()
                ->assertMissing('div[data-inertiaui-modal-id]');
        });
    }
}