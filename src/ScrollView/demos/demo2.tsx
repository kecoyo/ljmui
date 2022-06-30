import React, { useState } from 'react';
import { Button, Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ScrollView } from 'ljmui2';

export default () => {
  let array1 = [];
  for (let i = 0; i < 100; i++) {
    array1.push(i + 1);
  }
  let array2 = [];
  for (let i = 100; i < 120; i++) {
    array2.push(i + 1);
  }

  const [type, setType] = useState(1);

  return (
    <>
      <DemoBlock title="动态内容">
        <ScrollView style={{ height: 300 }}>
          <div>
            {(type === 1 ? array1 : array2).map((num) => (
              <p key={num}>{num}</p>
            ))}
          </div>
        </ScrollView>
        <Button color="primary" onClick={() => setType(type === 1 ? 2 : 1)}>
          switch content element
        </Button>
      </DemoBlock>
    </>
  );
};
