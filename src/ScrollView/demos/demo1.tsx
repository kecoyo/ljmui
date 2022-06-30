import React from 'react';
import { Button, Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ScrollView } from 'ljmui2';

export default () => {
  let array = [];
  for (let i = 0; i < 100; i++) {
    array.push(i + 1);
  }
  return (
    <>
      <DemoBlock title="纵向滚动">
        <ScrollView style={{ height: 300 }}>
          <div>
            {array.map((num) => (
              <p key={num}>{num}</p>
            ))}
          </div>
        </ScrollView>
      </DemoBlock>

      <DemoBlock title="横向滚动">
        <ScrollView direction="horizontal" style={{ height: 100 }}>
          <div style={{ display: 'flex' }}>
            {array.map((num) => (
              <p key={num} style={{ width: 40 }}>
                {num}
              </p>
            ))}
          </div>
        </ScrollView>
      </DemoBlock>
    </>
  );
};
