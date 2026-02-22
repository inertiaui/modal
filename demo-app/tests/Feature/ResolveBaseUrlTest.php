<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Illuminate\Http\Request;
use Inertia\Testing\AssertableInertia;
use InertiaUI\Modal\Modal;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ResolveBaseUrlTest extends TestCase
{
    protected Modal $modal;

    protected function setUp(): void
    {
        parent::setUp();

        $this->modal = new Modal('TestComponent');
    }

    #[Test]
    public function it_prioritizes_header_over_referer_and_configured_base_url()
    {
        $this->modal->baseUrl('https://example.com/configured');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set(Modal::HEADER_BASE_URL, 'https://example.com/from-header');
        $request->headers->set('referer', 'https://example.com/from-referer');

        $this->assertEquals('https://example.com/from-header', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_skips_header_when_it_matches_current_path()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set(Modal::HEADER_BASE_URL, 'https://example.com/users/1/edit');
        $request->headers->set('referer', 'https://example.com/dashboard');

        $this->assertEquals('https://example.com/dashboard', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_skips_configured_base_url_when_it_matches_current_path()
    {
        $this->modal->baseUrl('https://example.com/users/1/edit');

        $request = Request::create('/users/1/edit', 'GET');

        $this->assertNull($this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_falls_back_to_configured_base_url_when_header_and_referer_match_current_path()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set(Modal::HEADER_BASE_URL, 'https://example.com/users/1/edit');
        $request->headers->set('referer', 'https://example.com/users/1/edit');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_uses_referer_when_path_differs_from_current_request()
    {
        $this->modal->baseUrl('https://example.com/configured');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set('referer', 'https://example.com/dashboard');

        $this->assertEquals('https://example.com/dashboard', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_uses_configured_base_url_when_no_headers()
    {
        $this->modal->baseUrl('https://example.com/base');

        $request = Request::create('/users/1/edit', 'GET');

        $this->assertEquals('https://example.com/base', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_returns_null_when_no_base_url_sources_available()
    {
        $request = Request::create('/users/1/edit', 'GET');

        $this->assertNull($this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_ignores_referer_when_path_matches_current_request()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set('referer', 'https://example.com/users/1/edit');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_ignores_referer_query_strings_when_comparing_paths()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit?navigate=1', 'GET');
        $request->headers->set('referer', 'https://example.com/users/1/edit?foo=bar');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_returns_null_when_referer_matches_and_no_configured_base_url()
    {
        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set('referer', 'https://example.com/users/1/edit');

        $this->assertNull($this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_uses_referer_when_it_is_a_parent_or_different_path()
    {
        $this->modal->baseUrl('https://example.com/configured');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set('referer', 'https://example.com/users');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_normalizes_trailing_slashes_when_comparing_paths()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit/', 'GET');
        $request->headers->set('referer', 'https://example.com/users/1/edit');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_handles_root_path()
    {
        $this->modal->baseUrl('https://example.com/dashboard');

        $request = Request::create('/', 'GET');
        $request->headers->set('referer', 'https://example.com/');

        $this->assertEquals('https://example.com/dashboard', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_compares_paths_case_sensitively()
    {
        $this->modal->baseUrl('https://example.com/configured');

        $request = Request::create('/Users/1/Edit', 'GET');
        $request->headers->set('referer', 'https://example.com/users/1/edit');

        $this->assertEquals('https://example.com/users/1/edit', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_handles_referer_without_scheme()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set('referer', '/users/1/edit');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_ignores_port_and_fragment_when_comparing_paths()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/1/edit', 'GET');
        $request->headers->set('referer', 'https://example.com:8080/users/1/edit#section');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_decodes_url_encoded_paths_when_comparing()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/John Doe/edit', 'GET');
        $request->headers->set('referer', 'https://example.com/users/John%20Doe/edit');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_handles_special_characters_in_path()
    {
        $this->modal->baseUrl('https://example.com/users');

        $request = Request::create('/users/test+plus/edit', 'GET');
        $request->headers->set('referer', 'https://example.com/users/test+plus/edit');

        $this->assertEquals('https://example.com/users', $this->modal->resolveBaseUrl($request));
    }

    #[Test]
    public function it_prevents_infinite_loop_when_referer_matches_modal_route()
    {
        $user = UserFactory::new()->create();
        $modalUrl = route('users.edit', $user);

        // Direct URL visit (no X-InertiaUI-Modal header) triggers dual-request
        // The referer matches the modal URL, so it should fall back to the configured base URL
        $this->getJson($modalUrl, [
            'referer' => $modalUrl,
        ])
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $assert) => $assert
                ->component('Users')
                ->has('users')
                ->where('_inertiaui_modal.component', 'EditUser')
                ->where('_inertiaui_modal.baseUrl', '/users')
            );
    }
}
