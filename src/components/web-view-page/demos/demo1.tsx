import React from 'react';
import { WebViewPage } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

const url = 'https://www.ljlx.com';

export default () => {
  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <WebViewPage className={styles.page} title='乐教乐学' src={url} />
      </DemoBlock>
    </div>
  );
};
