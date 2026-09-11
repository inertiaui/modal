<?php

declare(strict_types=1);

namespace Tests\Unit;

use Illuminate\Contracts\Support\Arrayable;
use Inertia\Inertia;
use InertiaUI\Modal\Modal;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ModalPropsTest extends TestCase
{
    #[Test]
    public function it_accepts_props_as_an_array()
    {
        $modal = new Modal('Component', ['name' => 'Taylor']);

        $this->assertSame(['name' => 'Taylor'], $modal->getProps());
    }

    #[Test]
    public function it_defaults_to_an_empty_array_of_props()
    {
        $modal = new Modal('Component');

        $this->assertSame([], $modal->getProps());
    }

    #[Test]
    public function it_accepts_props_as_an_arrayable()
    {
        $modal = new Modal('Component', $this->arrayableProps(['name' => 'Taylor']));

        $this->assertSame(['name' => 'Taylor'], $modal->getProps());
    }

    #[Test]
    public function it_accepts_an_arrayable_through_the_response_factory_macro()
    {
        $modal = Inertia::modal('Component', $this->arrayableProps(['name' => 'Taylor']));

        $this->assertInstanceOf(Modal::class, $modal);
        $this->assertSame(['name' => 'Taylor'], $modal->getProps());
    }

    /**
     * @param  array<string, mixed>  $props
     * @return Arrayable<string, mixed>
     */
    private function arrayableProps(array $props): Arrayable
    {
        return new class($props) implements Arrayable
        {
            /**
             * @param  array<string, mixed>  $props
             */
            public function __construct(private array $props) {}

            /**
             * @return array<string, mixed>
             */
            public function toArray(): array
            {
                return $this->props;
            }
        };
    }
}
