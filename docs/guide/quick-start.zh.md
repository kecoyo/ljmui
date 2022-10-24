# 快速上手

## 安装

```bash
$ npm install --save ljmui2
# or
$ yarn add ljmui2
```

## 引入

直接引入组件即可，ljmui2 会自动为你加载 css 样式文件：

```js
import { Button } from 'ljmui2'
```

如果你开发的是阿里/蚂蚁内部项目，那么请额外阅读一下[这篇指引](https://yuque.antfin.com/ljmui2/kfcgs3/md4or5)。

## 兼容性

我们建议在项目中增加下面的 babel 配置，这样可以达到最大兼容性，为 iOS Safari `>= 10` 和 Chrome `>= 49`：

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
  不要把 node_modules 排除在 babel 编译之外，不然上面的配置不会有效果
</Alert>

对于 TypeScript，我们兼容的版本是 `>= 3.8`。

对于 React，我们兼容的版本是 `^16.8.0` `^17.0.0` `^18.0.0`。

由于 iOS 9 并不支持 CSS 变量，因此如果你需要支持 iOS 9，请参考 [这篇文档](/zh/guide/css-variables#css-变量自动降级) 启用 CSS 变量自动降级，并且将 babel 配置中的 target ios 设置为 `9`。

## 在线体验

如果你不想在本地配置环境，也可以直接在 [codesandbox](https://codesandbox.io/s/ljmui2-snrxr?file=/package.json) 或 [stackblitz](https://stackblitz.com/edit/ljmui2?file=index.tsx) 上进行体验。
