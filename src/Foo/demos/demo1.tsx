import React from 'react';
import { Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { Foo } from 'ljmui2';

export default () => {
  return (
    <>
      <DemoBlock title="基本用法">
        <Foo>123</Foo>
      </DemoBlock>

      <DemoBlock title="默认提供 5 种通用标签颜色">
        <Space>
          <Foo color="default">Default</Foo>
          <Foo color="primary">测试</Foo>
          <Foo color="success">Success</Foo>
          <Foo color="warning">Warning</Foo>
          <Foo color="danger">Danger</Foo>
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <Space>
          <Foo color="#2db7f5">#2db7f5</Foo>
          <Foo color="#87d068">#87d068</Foo>
          <Foo color="#108ee9">#108ee9</Foo>
        </Space>
      </DemoBlock>
      <DemoBlock title="线框填充">
        <Space>
          <Foo color="primary" fill="outline">
            Primary
          </Foo>
          <Foo color="#87d068" fill="outline">
            #87d068
          </Foo>
          <Foo color="#ff6430" fill="outline">
            #ff6430
          </Foo>
        </Space>
      </DemoBlock>

      <DemoBlock title="圆角">
        <Foo round color="#2db7f5">
          kongxin
        </Foo>
      </DemoBlock>

      <DemoBlock title="通过 CSS 变量进行个性化">
        <Space>
          <Foo color="primary" fill="outline" style={{ '--border-radius': '6px' }}>
            Primary
          </Foo>
          <Foo color="success" fill="outline" style={{ '--background-color': '#c8f7c5' }}>
            Success
          </Foo>
          <Foo color="warning" style={{ '--text-color': 'var(--adm-color-text)' }}>
            Warning
          </Foo>
          <Foo color="danger" fill="outline" style={{ '--border-color': 'var(--adm-color-weak)' }}>
            Danger
          </Foo>
        </Space>
      </DemoBlock>
    </>
  );
};
