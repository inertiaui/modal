<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Inertia\Testing\AssertableInertia;
use InertiaUI\Modal\Modal;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ModalTest extends TestCase
{
    #[Test]
    public function it_sets_base_url()
    {
        $modal = new Modal('TestComponent');
        $modal->baseUrl('https://example.com');

        $this->assertEquals('https://example.com', $modal->getBaseUrl());
    }

    #[Test]
    public function it_sets_base_url_using_named_route()
    {
        $modal = new Modal('TestComponent');
        $modal->baseRoute('roles.create');

        $this->assertEquals(url('/roles/create'), $modal->getBaseUrl());
    }

    #[Test]
    public function it_returns_simple_modal_response_for_xhr_requests()
    {
        $user = UserFactory::new()->create();

        // XHR requests (with X-InertiaUI-Modal header) get simple modal response
        $this->getJson(route('users.edit', $user), [
            Modal::HEADER_MODAL => 'test-modal-id',
        ])
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $assert) => $assert
                ->component('EditUser')
                ->has('roles')
                ->where('user.id', $user->id)
            );
    }

    #[Test]
    public function it_returns_simple_modal_response_when_no_base_route_is_set()
    {
        // No base URL configured for this route, so always returns simple response
        $this->getJson(route('roles.create'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $assert) => $assert
                ->component('CreateRole')
            );
    }

    #[Test]
    public function it_returns_dual_request_response_for_direct_url_visits()
    {
        $user = UserFactory::new()->create();

        // Direct URL visits (no X-InertiaUI-Modal header) get dual-request pattern
        // which renders the base page with modal data in _inertiaui_modal prop
        $this->getJson(route('users.edit', $user))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $assert) => $assert
                ->component('Users')
                ->has('users')
                ->has('_inertiaui_modal', fn (AssertableInertia $assert) => $assert
                    ->where('component', 'EditUser')
                    ->has('props')
                    ->has('id')
                    ->where('props.user.id', $user->id)
                    ->has('version')
                    ->has('url')
                    ->has('meta')
                    ->where('baseUrl', '/users')
                )
            );
    }
}
