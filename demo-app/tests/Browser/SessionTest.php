<?php

use App\Models\User;
use Illuminate\Support\Str;

it('can submit a form and redirect', function (bool $navigate) {
    $firstUser = User::orderBy('name')->first();

    $page = visit('/users'.($navigate ? '?navigate=1' : ''))
        ->waitForText($firstUser->name)
        ->click("[dusk='edit-user-{$firstUser->id}']")
        ->assertSeeIn('.im-modal-content', 'Edit User')
        ->type('name', $newName = Str::random(10))
        ->press('Save')
        ->waitForText('User updated successfully!');

    waitUntilMissingModal($page)
        ->assertPathIs('/users');

    test()->assertDatabaseHas('users', [
        'id' => $firstUser->id,
        'name' => $newName,
    ]);
})->with('navigate');
