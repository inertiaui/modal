# Base Route/URL

By default, Inertia Modal doesn't change the URL when opening a modal. It just stays on the same page and displays the modal content. However, you may want to change this behavior and update the URL when opening a modal. This has a few benefits:

* It allows users to bookmark the modal and share the URL with others.
* The modal becomes part of the browser history, so users can use the back and forward buttons.
* It makes the modal content accessible to search engines (when using [SSR](https://inertiajs.com/server-side-rendering)).
* It allows you to open the modal in a new tab.

To use this feature, there's a small change needed in the backend of your app.

## Define a Base Route

To define the base route for your modal, you need to use the `Inertia::modal()` method in your controller instead of the `Inertia::render()` method. It accepts the same arguments as the `Inertia::render()` method:

```php{1,2}
return Inertia::render('EditUser', [ // [!code --]
return Inertia::modal('EditUser', [ // [!code ++]
    'roles' => Role::pluck('name', 'id'),
    'user' => $user,
]);
```

Then, you can chain the `baseUrl` or `baseRoute` method to the `Inertia::modal()` method to define the base route for your modal:

```php
return Inertia::modal('EditUser')
    ->baseRoute('users.index')
    // or:
    ->baseUrl('/users');
```

Just like the regular `route()` method, the `baseRoute()` method accepts an array of parameters as its second argument.

> [!WARNING]Reusing the Modal URL with different Base Routes
> The `baseRoute` and `baseUrl` methods act merely as a fallback when the modal is directly opened using a URL. If you open the modal from a different route, the URL will be generated based on the current route.

## Redirector

The backend package extends the default Laravel redirector to take the base route into account when redirecting from a modal. This means you can continue using the `back()` method to redirect back to the base route of the modal. If you want to disable this behavior, you can publish the configuration file and set the `bind_extended_redirector` option to `false`. You can then use the global `back_from_modal()` helper method to redirect back.

```bash
php artisan vendor:publish --provider="InertiaUI\Modal\ModalServiceProvider"
```
