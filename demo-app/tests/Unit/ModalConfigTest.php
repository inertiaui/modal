<?php

declare(strict_types=1);

namespace Tests\Unit;

use InertiaUI\Modal\ModalConfig;
use InertiaUI\Modal\ModalPosition;
use InertiaUI\Modal\ModalType;
use InvalidArgumentException;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ModalConfigTest extends TestCase
{
    #[Test]
    public function it_can_create_a_new_instance()
    {
        $config = ModalConfig::new();

        $this->assertInstanceOf(ModalConfig::class, $config);
        $this->assertEquals([
            'type' => null,
            'modal' => null,
            'slideover' => null,
            'closeButton' => null,
            'closeExplicitly' => null,
            'maxWidth' => null,
            'paddingClasses' => null,
            'panelClasses' => null,
            'position' => null,
        ], $config->toArray());
    }

    #[Test]
    public function it_can_set_the_type_to_modal()
    {
        $config = ModalConfig::new()->modal();

        $this->assertEquals(ModalType::Modal->value, $config->toArray()['type']);
        $this->assertTrue($config->toArray()['modal']);
        $this->assertFalse($config->toArray()['slideover']);
    }

    #[Test]
    public function it_can_set_the_type_to_slideover()
    {
        $config = ModalConfig::new()->slideover();

        $this->assertEquals(ModalType::Slideover->value, $config->toArray()['type']);
        $this->assertFalse($config->toArray()['modal']);
        $this->assertTrue($config->toArray()['slideover']);
    }

    #[Test]
    public function it_can_configure_the_close_button()
    {
        $config = ModalConfig::new()->closeButton();
        $this->assertTrue($config->toArray()['closeButton']);

        $config = ModalConfig::new()->closeButton(false);
        $this->assertFalse($config->toArray()['closeButton']);
    }

    #[Test]
    public function it_can_configure_the_explicit_closing()
    {
        $config = ModalConfig::new()->closeExplicitly();
        $this->assertTrue($config->toArray()['closeExplicitly']);

        $config = ModalConfig::new()->closeExplicitly(false);
        $this->assertFalse($config->toArray()['closeExplicitly']);
    }

    #[Test]
    #[DataProvider('validMaxWidthProvider')]
    public function it_can_set_a_max_width(string $width)
    {
        $config = ModalConfig::new()->maxWidth($width);
        $this->assertEquals($width, $config->toArray()['maxWidth']);
    }

    public static function validMaxWidthProvider(): array
    {
        return [
            'sm width' => ['sm'],
            'md width' => ['md'],
            'lg width' => ['lg'],
            'xl width' => ['xl'],
            '2xl width' => ['2xl'],
            '3xl width' => ['3xl'],
            '4xl width' => ['4xl'],
            '5xl width' => ['5xl'],
            '6xl width' => ['6xl'],
            '7xl width' => ['7xl'],
        ];
    }

    #[Test]
    public function it_throws_an_exception_for_invalid_max_width()
    {
        $this->expectException(InvalidArgumentException::class);

        ModalConfig::new()->maxWidth('invalid');
    }

    #[Test]
    public function it_can_set_padding_classes()
    {
        $config = ModalConfig::new()->paddingClasses('p-4');

        $this->assertEquals('p-4', $config->toArray()['paddingClasses']);
    }

    #[Test]
    public function it_can_set_panel_classes()
    {
        $config = ModalConfig::new()->panelClasses('bg-white');

        $this->assertEquals('bg-white', $config->toArray()['panelClasses']);
    }

    #[Test]
    public function it_can_set_the_position()
    {
        $config = ModalConfig::new()->position(ModalPosition::Center);

        $this->assertEquals(ModalPosition::Center->value, $config->toArray()['position']);
    }

    #[Test]
    #[DataProvider('positionMethodsProvider')]
    public function it_can_set_a_predefined_positions(string $method, ModalPosition $expectedPosition)
    {
        $config = ModalConfig::new()->$method();
        $this->assertEquals($expectedPosition->value, $config->toArray()['position']);
    }

    public static function positionMethodsProvider(): array
    {
        return [
            'bottom position' => ['bottom', ModalPosition::Bottom],
            'center position' => ['center', ModalPosition::Center],
            'left position' => ['left', ModalPosition::Left],
            'right position' => ['right', ModalPosition::Right],
            'top position' => ['top', ModalPosition::Top],
        ];
    }

    #[Test]
    public function it_can_chain_multiple_configurations()
    {
        $config = ModalConfig::new()
            ->modal()
            ->closeButton()
            ->maxWidth('2xl')
            ->paddingClasses('p-4')
            ->panelClasses('bg-white')
            ->center();

        $this->assertEquals([
            'type' => ModalType::Modal->value,
            'modal' => true,
            'slideover' => false,
            'closeButton' => true,
            'closeExplicitly' => null,
            'maxWidth' => '2xl',
            'paddingClasses' => 'p-4',
            'panelClasses' => 'bg-white',
            'position' => ModalPosition::Center->value,
        ], $config->toArray());
    }
}
