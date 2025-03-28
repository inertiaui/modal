<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Illuminate\Http\Request;
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
    public function it_resolves_base_url_from_header()
    {
        $modal = new Modal('TestComponent');
        $modal->baseUrl('https://example.com');

        $request = new Request;
        $request->headers->set(Modal::HEADER_BASE_URL, 'https://test.com');

        $result = $modal->resolveBaseUrl($request);

        $this->assertEquals('https://test.com', $result);
    }

    #[Test]
    public function it_returns_the_modal_as_is_when_not_using_the_router()
    {
        $user = UserFactory::new()->create();

        $this->getJson(route('users.edit', $user), [
            Modal::HEADER_USE_ROUTER => '0',
        ])
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $assert) => $assert
                ->component('EditUser')
                ->has('roles')
                ->where('user.id', $user->id)
            );
    }

    #[Test]
    public function it_returns_the_modal_as_is_when_no_base_route_is_set()
    {
        $user = UserFactory::new()->create();

        $this->getJson(route('roles.create'), [
            Modal::HEADER_USE_ROUTER => '1',
        ])
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $assert) => $assert
                ->component('CreateRole')
            );
    }

    #[Test]
    public function it_returns_the_base_page_with_the_modal_as_a_separate_prop_when_using_the_router()
    {
        $user = UserFactory::new()->create();

        $this->getJson(route('users.edit', $user), [
            Modal::HEADER_USE_ROUTER => '1',
        ])
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
