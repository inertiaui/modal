<?php

it('shows the inertia progress bar', function () {
    visit('/loading-prop')
        ->waitForText('Loading Prop')
        ->click('Open Slideover')
        ->assertPresent('#nprogress')
        ->assertPresent(waitForModalSelector())
        ->assertNotPresent('#nprogress');
});
