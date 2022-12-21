import React from 'react';
import { WebViewPage } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

const url = 'https://www.ljlx.com/ljlx/public/userprivacy.html';

export default () => {
  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='不显示标题'>
        <WebViewPage className={styles.page} src={url} />
      </DemoBlock>
    </div>
  );
};
