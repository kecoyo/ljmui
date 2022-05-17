## ProgressModal

Demo: 手动进度条

```tsx
import React from 'react';
import { Space, Button } from 'antd-mobile';
import { ProgressModal, sleep } from 'ljmui2';

export default () => {
  const handleOpen = async () => {
    let handler = ProgressModal.show({ percent: 0, message: '开始加载...' });

    for (let i = 1; i <= 11; i++) {
      await sleep(1000);
      if (i * 10 < 100) {
        handler.update({
          percent: i * 10,
          message: '正在生成错题总结...',
        });
      } else if (i * 10 === 100) {
        handler.update({
          percent: i * 10,
          message: '生成完成',
        });
      } else {
        handler.close();
      }
    }
  };
  return (
    <Space>
      <Button color="primary" onClick={handleOpen}>
        打开进度弹窗
      </Button>
    </Space>
  );
};
```

Demo: 自动进度条

```tsx
import React from 'react';
import { Space, Button } from 'antd-mobile';
import { ProgressModal } from 'ljmui2';

export default () => {
  const handleOpen = async () => {
    let handler = ProgressModal.start({
      message: (progress) =>
        progress <= 30 ? '加载学情数据' : progress <= 50 ? '加载错题本数据' : '快完了，别着急',
    });

    // 随机一个时间完成进度
    setTimeout(() => {
      handler.stop();
    }, 10000);
  };
  return (
    <Space>
      <Button color="primary" onClick={handleOpen}>
        打开进度弹窗
      </Button>
    </Space>
  );
};
```
