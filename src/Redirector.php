<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

use Illuminate\Routing\Redirector as BaseRedirector;

class Redirector extends BaseRedirector
{
    /**
     * Create a new redirect response to the previous location or a modal base URL.
     *
     * This method overrides the parent's 'back' method to handle modal-specific redirects.
     * If a modal base URL is present in the request header, it redirects to that URL.
     * Otherwise, it falls back to the parent's behavior.
     *
     * @param  int  $status
     * @param  array  $headers
     * @param  bool  $fallback
     * @return \Illuminate\Http\RedirectResponse
     */
    public function back($status = 302, $headers = [], $fallback = false)
    {
        if ($baseUrl = $this->generator->getRequest()->header(Modal::HEADER_BASE_URL)) {
            return $this->createRedirect($this->generator->to($baseUrl), $status, $headers);
        }

        return parent::back($status, $headers, $fallback);
    }
}
