<?php

declare(strict_types=1);

namespace InertiaUI\Modal;

if (! function_exists('back_from_modal')) {
    /**
     * Create a new redirect response to the previous location or a modal base URL.
     *
     * @param  int  $status
     * @param  array  $headers
     * @param  bool  $fallback
     * @return \Illuminate\Http\RedirectResponse
     */
    function back_from_modal($status = 302, $headers = [], $fallback = false)
    {
        return app('inertiaui_modal_redirector')->back($status, $headers, $fallback);
    }
}
