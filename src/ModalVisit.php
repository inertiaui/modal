<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Contracts\Support\Arrayable;

class ModalVisit implements Arrayable
{
    public function __construct(
        protected ?string $method = null,
        protected ?bool $navigate = null,
        protected ?array $data = null,
        protected ?array $headers = null,
        protected ?ModalConfig $config = null,
        protected ?QueryStringArrayFormat $queryStringArrayFormat = null,
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
     * Sets the HTTP method for the modal visit.
     */
    public function method(?string $method): self
    {
        $this->method = $method;

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
     * Sets the data to be sent with the modal visit.
     */
    public function data(?array $data): self
    {
        $this->data = blank($data) ? null : $data;

        return $this;
    }

    /**
     * Sets the headers to be sent with the modal visit.
     */
    public function headers(?array $headers): self
    {
        $this->headers = blank($headers) ? null : $headers;

        return $this;
    }

    /**
     * Sets the configuration for the modal visit.
     */
    public function config(?ModalConfig $config): self
    {
        $this->config = $config;

        return $this;
    }

    /**
     * Sets the query string array format for the modal visit.
     */
    public function queryStringArrayFormat(?QueryStringArrayFormat $queryStringArrayFormat): self
    {
        $this->queryStringArrayFormat = $queryStringArrayFormat;

        return $this;
    }

    /**
     * Converts the modal visit to an array.
     */
    public function toArray(): array
    {
        return [
            'method' => $this->method,
            'navigate' => $this->navigate,
            'data' => $this->data,
            'headers' => $this->headers,
            'config' => $this->config?->toArray(),
            'queryStringArrayFormat' => $this->queryStringArrayFormat?->value,
        ];
    }
}
