import React from 'react';
import { WebView } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

const demoSrc = 'https://www.ljlx.com';

export default () => {
  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <WebView src={demoSrc} />
      </DemoBlock>
    </div>
  );
};
