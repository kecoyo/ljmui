# Icon

Previewable pictures.

## When to Use

- Use when you need to show pictures.
- Display loading when loading large icons or fault-tolerant handling when loading fails.

## Demos

<code src="./demos/demo1.tsx"></code>

## Icon

### Props

| Name             | Description                                                         | Type                                                             | Default             |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------- |
| alt              | The description of the icon                                        | `string`                                                         | -                   |
| draggable        | Whether to allow users to drag the icon                            | `boolean`                                                        | `false`             |
| fallback         | Placeholder when failed to load                                     | `ReactNode`                                                      | default placeholder |
| fit              | The fill mode of the icon                                          | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'`       | `'fill'`            |
| height           | The height of the icon, if a number is passed in, the unit is `px` | `string \| number`                                               | -                   |
| lazy             | Whether to load icon lazily                                        | `boolean`                                                        | `false`             |
| onClick          | The icon click event                                               | `(event: React.MouseEvent<HTMLIconElement, Event>) => void`     | -                   |
| onContainerClick | The content click event                                             | `(event: React.MouseEvent<HTMLDivElement, Event>) => void`       | -                   |
| onError          | Callback when failed to load                                        | `(event: React.SyntheticEvent<HTMLIconElement, Event>) => void` | -                   |
| onLoad           | Triggered when icon loaded                                         | `(event: React.SyntheticEvent<HTMLIconElement, Event>) => void` | -                   |
| placeholder      | Placeholder when loading                                            | `ReactNode`                                                      | default placeholder |
| src              | The address of the icon                                            | `string`                                                         | -                   |
| width            | The width of the icon, if a number is passed in, the unit is `px`  | `string \| number`                                               | -                   |

In addition, the following HTML native attributes are also supported: `crossOrigin`、`decoding`、`loading`、`referrerPolicy`、`sizes`、`srcSet`、`useMap`

`width` `height` props is not conflict with `--width` `--height`. These components props is actually based on CSS variables, and exists only as a convenient way to set CSS variables.

### CSS Variables

| Name     | Description          | Default | Global               |
| -------- | -------------------- | ------- | -------------------- |
| --height | The height of icon. | `auto`  | `--adm-icon-height` |
| --width  | The width of icon.  | `auto`  | `--adm-icon-width`  |

## FAQ

### How to make Icon change from block element to inline-block element?

Icon is rendered as a block element by default. If you need to make it an inline-block element, you can nest an inline-block container in the outer layer, for example:

```jsx
<div style={{ display: 'inline-block' }}>
  <Icon />
</div>
```

### What is the difference between `onContainerClick` and `onClick`?

`onContainerClick` is the container click event, and `onClick` is the icon click event. `onClick` will not fire before the icon is loaded successfully or after the icon fails to load, but `onContainerClick` can be fired normally.
