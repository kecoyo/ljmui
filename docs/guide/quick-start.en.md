# Quick Start

## Installation

```bash
$ npm install --save ljmui2
# or
$ yarn add ljmui2
```

## Import

Just import the component directly and ljmui2 will automatically load css style files:

```js
import { Button } from 'ljmui2'
```

If you are developing an internal project in alibaba group or ant group, please read [this additional guide](https://yuque.antfin.com/ljmui2/kfcgs3/md4or5).

## Compatibility

We recommend adding the following babel configuration, so that maximum compatibility can be achieved (iOS Safari `>= 10` and Chrome `>= 49`):

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "49",
          "ios": "10"
        }
      }
    ]
  ]
}
```

<Alert type="warning">
  Do not exclude node_modules from babel compilation, otherwise the above configuration will not work
</Alert>

For TypeScript, ljmui2 is compatible with versions `>= 3.8`.

For React, ljmui2 is compatible with versions `^16.8.0` and `^17.0.0`.

Since iOS 9 does not support CSS variables, if you need to support iOS 9, please refer to [this document](/guide/css-variables#css-variables-auto-fallback) to enable automatic CSS variable degradation, and set target ios in babel configuration to `9`.

## Playground

If you don't want to configure your environment locally, you can also try it directly on [codesandbox](https://codesandbox.io/s/ljmui2-snrxr?file=/package.json) or [stackblitz](https://stackblitz.com/edit/ljmui2?file=index.tsx).
