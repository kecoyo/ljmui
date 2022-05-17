import React from 'react';
import { Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { FooBar } from 'ljmui2';

export default () => {
  return (
    <>
      <DemoBlock title="基本用法">
        <FooBar>123</FooBar>
      </DemoBlock>

      <DemoBlock title="默认提供 5 种通用标签颜色">
        <Space>
          <FooBar color="default">Default</FooBar>
          <FooBar color="primary">测试</FooBar>
          <FooBar color="success">Success</FooBar>
          <FooBar color="warning">Warning</FooBar>
          <FooBar color="danger">Danger</FooBar>
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <Space>
          <FooBar color="#2db7f5">#2db7f5</FooBar>
          <FooBar color="#87d068">#87d068</FooBar>
          <FooBar color="#108ee9">#108ee9</FooBar>
        </Space>
      </DemoBlock>
      <DemoBlock title="线框填充">
        <Space>
          <FooBar color="primary" fill="outline">
            Primary
          </FooBar>
          <FooBar color="#87d068" fill="outline">
            #87d068
          </FooBar>
          <FooBar color="#ff6430" fill="outline">
            #ff6430
          </FooBar>
        </Space>
      </DemoBlock>

      <DemoBlock title="圆角">
        <FooBar round color="#2db7f5">
          kongxin
        </FooBar>
      </DemoBlock>

      <DemoBlock title="通过 CSS 变量进行个性化">
        <Space>
          <FooBar color="primary" fill="outline" style={{ '--border-radius': '6px' }}>
            Primary
          </FooBar>
          <FooBar color="success" fill="outline" style={{ '--background-color': '#c8f7c5' }}>
            Success
          </FooBar>
          <FooBar color="warning" style={{ '--text-color': 'var(--adm-color-text)' }}>
            Warning
          </FooBar>
          <FooBar
            color="danger"
            fill="outline"
            style={{ '--border-color': 'var(--adm-color-weak)' }}
          >
            Danger
          </FooBar>
        </Space>
      </DemoBlock>
    </>
  );
};
