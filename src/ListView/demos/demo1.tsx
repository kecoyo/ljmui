import React from 'react';
import { Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ListView } from 'ljmui2';

export default () => {
  return (
    <>
      <DemoBlock title="基本用法">
        <ListView>123</ListView>
      </DemoBlock>

      <DemoBlock title="默认提供 5 种通用标签颜色">
        <Space>
          <ListView color="default">Default</ListView>
          <ListView color="primary">测试</ListView>
          <ListView color="success">Success</ListView>
          <ListView color="warning">Warning</ListView>
          <ListView color="danger">Danger</ListView>
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <Space>
          <ListView color="#2db7f5">#2db7f5</ListView>
          <ListView color="#87d068">#87d068</ListView>
          <ListView color="#108ee9">#108ee9</ListView>
        </Space>
      </DemoBlock>
      <DemoBlock title="线框填充">
        <Space>
          <ListView color="primary" fill="outline">
            Primary
          </ListView>
          <ListView color="#87d068" fill="outline">
            #87d068
          </ListView>
          <ListView color="#ff6430" fill="outline">
            #ff6430
          </ListView>
        </Space>
      </DemoBlock>

      <DemoBlock title="圆角">
        <ListView round color="#2db7f5">
          kongxin
        </ListView>
      </DemoBlock>

      <DemoBlock title="通过 CSS 变量进行个性化">
        <Space>
          <ListView color="primary" fill="outline" style={{ '--border-radius': '6px' }}>
            Primary
          </ListView>
          <ListView color="success" fill="outline" style={{ '--background-color': '#c8f7c5' }}>
            Success
          </ListView>
          <ListView color="warning" style={{ '--text-color': 'var(--adm-color-text)' }}>
            Warning
          </ListView>
          <ListView
            color="danger"
            fill="outline"
            style={{ '--border-color': 'var(--adm-color-weak)' }}
          >
            Danger
          </ListView>
        </Space>
      </DemoBlock>
    </>
  );
};
