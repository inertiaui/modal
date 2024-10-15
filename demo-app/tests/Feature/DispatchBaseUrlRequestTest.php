<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Testing\TestResponse;
use Inertia\Testing\AssertableInertia;
use InertiaUI\Modal\DispatchBaseUrlRequest;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DispatchBaseUrlRequestTest extends TestCase
{
    protected DispatchBaseUrlRequest $dispatcher;

    public function setUp(): void
    {
        parent::setUp();

        $this->dispatcher = new DispatchBaseUrlRequest(
            $this->app['router'],
            $this->app[Kernel::class]
        );
    }

    #[Test]
    public function it_creates_new_request_with_original_properties()
    {
        UserFactory::new()->count(3)->create();
        $originalRequest = Request::create('/users', 'GET', ['query' => 'param']);
        $originalRequest->headers->set('X-Test-Header', 'test-header-value');
        $originalRequest->setLocale('en');

        $baseUrl = '/roles/create';

        $response = ($this->dispatcher)($originalRequest, $baseUrl);
        $testResponse = new TestResponse($response);
        $testResponse->assertInertia(fn (AssertableInertia $page) => $page
            ->component('CreateRole')
            ->url(route('roles.create', ['query' => 'param'], false))
            ->where('headerValue', 'test-header-value')
        );
    }

    #[Test]
    public function it_preserves_request_data()
    {
        $originalRequest = Request::create(
            '/users', 'POST', [], [], [], [], json_encode(['name' => 'new-role'])
        );
        $originalRequest->headers->set('Content-Type', 'application/json');

        $baseUrl = '/roles';

        ($this->dispatcher)($originalRequest, $baseUrl);
        $this->assertEquals('Role created successfully!', session('message'));
    }

    #[Test]
    public function it_handles_responsable_objects()
    {
        $originalRequest = Request::create('/create/users', 'GET');

        $baseUrl = '/test/test';

        $this->app['router']->get('/test/test', function () {
            return new class DispatchBaseUrlRequestTest Responsable
            {
                public function toResponse($request)
                {
                    return response('Responsable Response');
                }
            };
        });

        $response = ($this->dispatcher)($originalRequest, $baseUrl);

        $this->assertEquals('Responsable Response', $response->getContent());
    }
}