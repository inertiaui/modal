<?php

namespace Tests\Feature;

use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use InertiaUI\Modal\Modal;
use InertiaUI\Modal\Redirector;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RedirectorTest extends TestCase
{
    protected Redirector $redirector;

    protected UrlGenerator $urlGenerator;

    protected Request $request;

    public function setUp(): void
    {
        parent::setUp();
        $this->urlGenerator = app(UrlGenerator::class);
        $this->redirector = new Redirector($this->urlGenerator);
        $this->request = new Request;
        app()->instance('request', $this->request);
    }

    #[Test]
    public function it_redirects_to_modal_base_url_when_header_is_present()
    {
        $this->request->headers->set(Modal::HEADER_BASE_URL, '/modal-base-url');

        $response = $this->redirector->back();

        $this->assertEquals(302, $response->getStatusCode());
        $this->assertEquals($this->urlGenerator->to('/modal-base-url'), $response->getTargetUrl());
    }

    #[Test]
    public function it_falls_back_to_parent_behavior_when_header_is_not_present()
    {
        $this->request->headers->set('referer', '/previous-url');

        $response = $this->redirector->back();

        $this->assertEquals(302, $response->getStatusCode());
        $this->assertEquals($this->urlGenerator->to('/previous-url'), $response->getTargetUrl());
    }

    #[Test]
    public function it_uses_fallback_url_when_no_header_and_no_referer()
    {
        $response = $this->redirector->back(302, [], '/fallback-url');

        $this->assertEquals(302, $response->getStatusCode());
        $this->assertEquals($this->urlGenerator->to('/fallback-url'), $response->getTargetUrl());
    }

    #[Test]
    public function it_respects_custom_status_code()
    {
        $this->request->headers->set(Modal::HEADER_BASE_URL, '/modal-base-url');

        $response = $this->redirector->back(301);

        $this->assertEquals(301, $response->getStatusCode());
    }

    #[Test]
    public function it_includes_custom_headers()
    {
        $this->request->headers->set(Modal::HEADER_BASE_URL, '/modal-base-url');

        $response = $this->redirector->back(302, ['X-Custom-Header' => 'Test']);

        $this->assertEquals('Test', $response->headers->get('X-Custom-Header'));
    }
}
