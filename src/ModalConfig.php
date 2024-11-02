<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Support\Arrayable;
use InvalidArgumentException;

class ModalConfig implements Arrayable
{
    public function __construct(
        protected ?ModalType $type = null,
        protected ?bool $navigate = null,
        protected ?bool $closeButton = null,
        protected ?bool $closeExplicitly = null,
        protected ?string $maxWidth = null,
        protected ?string $paddingClasses = null,
        protected ?string $panelClasses = null,
        protected ?ModalPosition $position = null
    ) {
        //
    }

    /**
     * Creates a new instance of the modal configuration.
     */
    public static function new(): self
    {
        return new self;
    }

    /**
     * Sets the type to Modal.
     */
    public function modal(): self
    {
        $this->type = ModalType::Modal;

        return $this;
    }

    /**
     * Sets the type to Slideover.
     */
    public function slideover(): self
    {
        $this->type = ModalType::Slideover;

        return $this;
    }

    /**
     * Configures whether the Base Route / URL feature should be used.
     */
    public function navigate(?bool $navigate = true): self
    {
        $this->navigate = $navigate;

        return $this;
    }

    /**
     * Controls the visibility of the close button in the modal.
     */
    public function closeButton(?bool $closeButton = true): self
    {
        $this->closeButton = $closeButton;

        return $this;
    }

    /**
     * Determines if the modal requires an explicit closing action, e.g.
     * no clicking outside the modal to close it and no escape key to close it.
     */
    public function closeExplicitly(?bool $closeExplicitly = true): self
    {
        $this->closeExplicitly = $closeExplicitly;

        return $this;
    }

    /**
     * Sets the maximum width of the modal using Tailwind conventions.
     */
    public function maxWidth(?string $maxWidth): self
    {
        if (! in_array($maxWidth, ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'])) {
            throw new InvalidArgumentException('Invalid max width provided. Please use a value between sm and 7xl.');
        }

        $this->maxWidth = $maxWidth;

        return $this;
    }

    /**
     * Defines custom padding classes for the modal content
     */
    public function paddingClasses(?string $paddingClasses): self
    {
        $this->paddingClasses = $paddingClasses;

        return $this;
    }

    /**
     * Sets custom classes for the modal panel element
     */
    public function panelClasses(?string $panelClasses): self
    {
        $this->panelClasses = $panelClasses;

        return $this;
    }

    /**
     * Sets the position of the modal on the screen
     */
    public function position(?ModalPosition $position): self
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Positions the modal at the bottom of the screen
     */
    public function bottom(): self
    {
        return $this->position(ModalPosition::Bottom);
    }

    /**
     * Centers the modal on the screen
     */
    public function center(): self
    {
        return $this->position(ModalPosition::Center);
    }

    /**
     * Positions the slideover at the left side of the screen
     */
    public function left(): self
    {
        return $this->position(ModalPosition::Left);
    }

    /**
     * Positions the slideover at the right side of the screen
     */
    public function right(): self
    {
        return $this->position(ModalPosition::Right);
    }

    /**
     * Positions the modal at the top of the screen
     */
    public function top(): self
    {
        return $this->position(ModalPosition::Top);
    }

    /**
     * Converts the modal configuration to an array.
     */
    public function toArray(): array
    {
        return [
            'type' => $this->type?->value,
            'modal' => $this->type instanceof ModalType && $this->type === ModalType::Modal,
            'slideover' => $this->type instanceof ModalType && $this->type === ModalType::Slideover,
            'navigate' => $this->navigate,
            'closeButton' => $this->closeButton,
            'closeExplicitly' => $this->closeExplicitly,
            'maxWidth' => $this->maxWidth,
            'paddingClasses' => $this->paddingClasses,
            'panelClasses' => $this->panelClasses,
            'position' => $this->position?->value,
        ];
    }
}
