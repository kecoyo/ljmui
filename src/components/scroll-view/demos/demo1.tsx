import React from 'react';
import { ScrollView } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

export const getList = (len = 100) => {
  const array: Array<number> = [];
  for (let i = 0; i < len; i++) {
    array.push(i + 1);
  }
  return array;
};

export default () => {
  const list: Array<number> = getList(100);
  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <ScrollView className={styles.scrollview}>
          <div>
            {list.map((num, i) => (
              <div key={num} className={styles.item}>
                {num}
              </div>
            ))}
          </div>
        </ScrollView>
      </DemoBlock>
    </div>
  );
};
