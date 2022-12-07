import React, { useRef, useEffect } from 'react';
import { Space } from 'antd-mobile';
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons';
import { Page, PageRef } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

export default () => {
  const pageRef = useRef<PageRef>(null);

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ pageRef', pageRef);
    if (pageRef && pageRef.current) {
      setTimeout(() => {
        pageRef.current?.scrollTo(0, -100);
      }, 100);
    }
  });

  return (
    <div style={{ userSelect: 'none' }}>
      <DemoBlock title='基础用法'>
        <Page ref={pageRef} className={styles.page} title={'Page 页面'} color='primary' scroll={true} onScroll={(e: any) => console.log(e)}>
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </Page>
      </DemoBlock>
    </div>
  );
};
