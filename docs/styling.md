# Styling

A fair bit of styling can be adjusted using the [configuration](/configuration) options. However, you may want to customize the modal even further using CSS. The components use Tailwind CSS classes, but all major elements have their own class names, so you can easily target them with your own styles.

## Available Classes

You're probably the fastest if you just inspect the modal in your browser and see which classes are used. To give you a head start, here are the classes that are used: all classes are prefixed with `im-` to avoid conflicts with other classes.

| Class | Description |
| --- | --- |
| `im-dialog` | The dialog element (native `<dialog>` or `<div>` based on config) |
| `im-close-button` | The close button |
| `im-backdrop` | The backdrop behind the modal (only rendered when `useNativeDialog` is `false`) |
| `im-modal-container` | The screen-filling container for the modal |
| `im-modal-positioner` | The container that positions the modal vertically |
| `im-modal-wrapper` | The container that sets the maximum width of the modal |
| `im-modal-content` | The actual modal content |
| `im-slideover-container` | The screen-filling container for the slideover |
| `im-slideover-positioner` | The container that positions the slideover vertically |
| `im-slideover-wrapper` | The container that sets the maximum width of the slideover |
| `im-slideover-content` | The actual slideover content |

## Native Dialog Backdrop

When using the native dialog (`useNativeDialog: true`, which is the default), the backdrop is rendered using the `::backdrop` pseudo-element. You can style it using CSS:

```css
dialog.im-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
```

Note that Tailwind CSS cannot target the `::backdrop` pseudo-element, so you'll need to use regular CSS for this. The default backdrop has a semi-transparent dark background with a blur effect.
