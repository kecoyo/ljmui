import React from 'react';
import { WebView } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

const url = 'https://www.ljlx.com/ljlx/public/userprivacy.html';

export default () => {
  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <WebView className={styles.webView} src={url} />
      </DemoBlock>
    </div>
  );
};
