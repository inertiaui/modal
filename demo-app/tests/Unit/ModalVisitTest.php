<?php

declare(strict_types=1);

namespace Tests\Unit;

use InertiaUI\Modal\ModalConfig;
use InertiaUI\Modal\ModalVisit;
use InertiaUI\Modal\QueryStringArrayFormat;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ModalVisitTest extends TestCase
{
    #[Test]
    public function it_can_create_a_new_instance()
    {
        $visit = ModalVisit::new();

        $this->assertInstanceOf(ModalVisit::class, $visit);
        $this->assertEquals([
            'method' => null,
            'navigate' => null,
            'data' => null,
            'headers' => null,
            'config' => null,
            'queryStringArrayFormat' => null,
        ], $visit->toArray());
    }

    #[Test]
    #[DataProvider('httpMethodsProvider')]
    public function it_can_set_the_http_method(string $method)
    {
        $visit = ModalVisit::new()->method($method);

        $this->assertEquals($method, $visit->toArray()['method']);
    }

    public static function httpMethodsProvider(): array
    {
        return [
            'GET method' => ['GET'],
            'POST method' => ['POST'],
            'PUT method' => ['PUT'],
            'PATCH method' => ['PATCH'],
            'DELETE method' => ['DELETE'],
        ];
    }

    #[Test]
    public function it_can_configure_navigation()
    {
        $visit = ModalVisit::new()->navigate();
        $this->assertTrue($visit->toArray()['navigate']);

        $visit = ModalVisit::new()->navigate(false);
        $this->assertFalse($visit->toArray()['navigate']);
    }

    #[Test]
    public function it_can_set_the_data()
    {
        $data = ['key' => 'value'];
        $visit = ModalVisit::new()->data($data);

        $this->assertEquals($data, $visit->toArray()['data']);
    }

    #[Test]
    public function it_sets_the_data_to_null_when_empty()
    {
        $visit = ModalVisit::new()->data([]);

        $this->assertNull($visit->toArray()['data']);
    }

    #[Test]
    public function it_can_set_headers()
    {
        $headers = ['X-Custom' => 'value'];
        $visit = ModalVisit::new()->headers($headers);

        $this->assertEquals($headers, $visit->toArray()['headers']);
    }

    #[Test]
    public function it_sets_the_headers_to_null_when_empty()
    {
        $visit = ModalVisit::new()->headers([]);

        $this->assertNull($visit->toArray()['headers']);
    }

    #[Test]
    public function it_can_set_a_modal_config()
    {
        $config = ModalConfig::new()->modal()->maxWidth('2xl');
        $visit = ModalVisit::new()->config($config);

        $this->assertEquals($config->toArray(), $visit->toArray()['config']);
    }

    #[Test]
    public function it_can_set_a_modal_config_from_a_callable()
    {
        $visit = ModalVisit::new()->config(function (ModalConfig $config) {
            $config->slideover()->maxWidth('3xl');
        });

        $this->assertEquals([
            'type' => 'slideover',
            'modal' => false,
            'slideover' => true,
            'closeButton' => null,
            'closeExplicitly' => null,
            'maxWidth' => '3xl',
            'paddingClasses' => null,
            'panelClasses' => null,
            'position' => null,
        ], $visit->toArray()['config']);
    }

    #[Test]
    public function it_can_set_a_query_string_array_format()
    {
        $format = QueryStringArrayFormat::Brackets;
        $visit = ModalVisit::new()->queryStringArrayFormat($format);

        $this->assertEquals($format->value, $visit->toArray()['queryStringArrayFormat']);
    }

    #[Test]
    public function it_can_chain_multiple_configurations()
    {
        $config = ModalConfig::new()->modal();
        $data = ['key' => 'value'];
        $headers = ['X-Custom' => 'header'];

        $visit = ModalVisit::new()
            ->method('POST')
            ->navigate()
            ->data($data)
            ->headers($headers)
            ->config($config)
            ->queryStringArrayFormat(QueryStringArrayFormat::Brackets);

        $this->assertEquals([
            'method' => 'POST',
            'navigate' => true,
            'data' => $data,
            'headers' => $headers,
            'config' => $config->toArray(),
            'queryStringArrayFormat' => QueryStringArrayFormat::Brackets->value,
        ], $visit->toArray());
    }
}
