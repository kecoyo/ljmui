import React from 'react';
import { TabsPage } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

export default () => {
  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <TabsPage className={styles.pageTabs} style={{ '--content-padding': 30 }}>
          <TabsPage.Tab title='原卷' key='origin'>
            <input />
          </TabsPage.Tab>
          <TabsPage.Tab title='学情分析' key='xueqing'>
            <input />
          </TabsPage.Tab>
        </TabsPage>
      </DemoBlock>
    </div>
  );
};
