<?php

declare(strict_types=1);

namespace InertiaUI\Modal\Testing;

/**
 * Helper class for Pest Browser testing with modal selectors.
 *
 * These helpers provide modal-specific selectors that can be used with
 * the Pest Browser plugin for testing modal functionality.
 *
 * @example
 * // In your tests/Pest.php:
 * use InertiaUI\Modal\Testing\PestModalHelpers;
 *
 * function waitForModalSelector(int $index = 0): string {
 *     return PestModalHelpers::waitForModalSelector($index);
 * }
 */
class PestModalHelpers
{
    /**
     * Get the selector for waiting for a modal to be fully entered.
     *
     * This selector waits for the modal to complete its enter animation
     * and be fully visible to the user.
     */
    public static function waitForModalSelector(int $index = 0): string
    {
        return '.im-dialog[data-inertiaui-modal-index="'.$index.'"] div[data-inertiaui-modal-entered="true"]';
    }

    /**
     * Get the modal container selector.
     *
     * This selector targets the modal dialog container element.
     */
    public static function modalSelector(int $index = 0): string
    {
        return '.im-dialog[data-inertiaui-modal-index="'.$index.'"]';
    }

    /**
     * Get the close button selector for a modal.
     *
     * This selector targets the close button within the modal.
     */
    public static function closeButtonSelector(int $index = 0): string
    {
        return '.im-dialog[data-inertiaui-modal-index="'.$index.'"] .im-close-button';
    }

    /**
     * Get the modal content selector.
     *
     * This selector targets the modal content area (for regular modals).
     */
    public static function modalContentSelector(int $index = 0): string
    {
        return '.im-dialog[data-inertiaui-modal-index="'.$index.'"] .im-modal-content';
    }

    /**
     * Get the slideover content selector.
     *
     * This selector targets the slideover content area.
     */
    public static function slideoverContentSelector(int $index = 0): string
    {
        return '.im-dialog[data-inertiaui-modal-index="'.$index.'"] .im-slideover-content';
    }
}
