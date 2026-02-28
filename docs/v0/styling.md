# Styling

A fair bit of styling can be adjusted using the [configuration](/configuration) options. However, you may want to customize the modal even further using CSS. The components use Tailwind CSS classes, but all major elements have their own class names, so you can easily target them with your own styles.

## Available Classes

You're probably the fastest if you just inspect the modal in your browser and see which classes are used. To give you a head start, here are the classes that are used: all classes are prefixed with `im-` to avoid conflicts with other classes.

| Class | Description |
| --- | --- |
| `im-dialog` | The [Headless UI dialog](https://headlessui.com/v1/vue/dialog) component |
| `im-close-button` | The close button |
| `im-backdrop` | The backdrop behind the modal |
| `im-modal-container` | The screen-filling container for the modal |
| `im-modal-positioner` | The container that positions the modal vertically |
| `im-modal-wrapper` | The container that sets the maximum width of the modal |
| `im-modal-content` | The actual modal content |
| `im-slideover-container` | The screen-filling container for the slideover |
| `im-slideover-positioner` | The container that positions the slideover vertically |
| `im-slideover-wrapper` | The container that sets the maximum width of the slideover |
| `im-slideover-content` | The actual slideover content |
