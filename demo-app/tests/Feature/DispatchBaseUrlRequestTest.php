<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Testing\TestResponse;
use Inertia\Testing\AssertableInertia;
use InertiaUI\Modal\DispatchBaseUrlRequest;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DispatchBaseUrlRequestTest extends TestCase
{
    protected DispatchBaseUrlRequest $dispatcher;

    protected function setUp(): void
    {
        parent::setUp();

        $this->dispatcher = new DispatchBaseUrlRequest($this->app['router']);
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
        session()->start();

        $originalRequest = Request::create(
            '/users', 'POST', [], [], [], [], json_encode([
                '_token' => session()->token(),
                'name' => 'new-role',
            ])
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
            return new class implements Responsable
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

    #[Test]
    public function it_disables_cookie_encryption_on_base_url()
    {
        $originalRequest = Request::create('/users', 'GET');

        $baseUrl = '/roles';

        $response = ($this->dispatcher)($originalRequest, $baseUrl);
        $this->assertInstanceOf(Response::class, $response);
        $cookies = $response->headers->getCookies();

        $this->assertNotEmpty($cookies);

        foreach ($cookies as $cookie) {
            $value = $cookie->getValue();

            $this->assertEquals(40, strlen($value));
            $decrypted = rescue(fn () => decrypt($value, false), report: false);
            $this->assertNull($decrypted);
        }
    }
}
