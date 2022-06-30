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
      <DemoBlock title="">
        <ScrollView scrollbar style={{ height: 300 }}>
          {array.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </ScrollView>
      </DemoBlock>
    </>
  );
};
