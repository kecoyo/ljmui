import React from 'react';
import { Space } from 'antd-mobile';
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons';
import { Page } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

export default () => {
  const right = (
    <Space>
      <SearchOutline />
      <MoreOutline />
      <span>文字</span>
    </Space>
  );

  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <Page className={styles.page} title={'Page 页面'} back='返回' left='关闭' right={right} />
      </DemoBlock>

      <DemoBlock title='不显示标题'>
        <Page className={styles.page} back='返回' left='关闭' right={right} />
      </DemoBlock>
    </div>
  );
};
