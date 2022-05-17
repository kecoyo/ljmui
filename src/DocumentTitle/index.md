## DocumentTitle

Demo: 修改 Document Title.

```tsx
import React, { useState } from 'react';
import { Space, Button } from 'antd-mobile';
import { DocumentTitle } from 'ljmui2';

export default () => {
  const [title, setTitle] = useState('AI提分摸底卷');

  const handleSet1 = async () => {
    setTitle('AI提分摸底卷 第1套');
  };

  const handleSet2 = async () => {
    setTitle('AI提分摸底卷 第2套');
  };

  return (
    <Space>
      <DocumentTitle title={title} />
      <Button color="primary" onClick={handleSet1}>
        AI提分摸底卷 第1套
      </Button>
      <Button color="primary" onClick={handleSet2}>
        AI提分摸底卷 第2套
      </Button>
    </Space>
  );
};
```
