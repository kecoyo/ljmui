import React from 'react';
import { Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ListPicker } from 'ljmui2';

export default () => {
  return (
    <>
      <DemoBlock title="基本用法">
        <ListPicker>123</ListPicker>
      </DemoBlock>

      <DemoBlock title="默认提供 5 种通用标签颜色">
        <Space>
          <ListPicker color="default">Default</ListPicker>
          <ListPicker color="primary">测试</ListPicker>
          <ListPicker color="success">Success</ListPicker>
          <ListPicker color="warning">Warning</ListPicker>
          <ListPicker color="danger">Danger</ListPicker>
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <Space>
          <ListPicker color="#2db7f5">#2db7f5</ListPicker>
          <ListPicker color="#87d068">#87d068</ListPicker>
          <ListPicker color="#108ee9">#108ee9</ListPicker>
        </Space>
      </DemoBlock>
      <DemoBlock title="线框填充">
        <Space>
          <ListPicker color="primary" fill="outline">
            Primary
          </ListPicker>
          <ListPicker color="#87d068" fill="outline">
            #87d068
          </ListPicker>
          <ListPicker color="#ff6430" fill="outline">
            #ff6430
          </ListPicker>
        </Space>
      </DemoBlock>

      <DemoBlock title="圆角">
        <ListPicker round color="#2db7f5">
          kongxin
        </ListPicker>
      </DemoBlock>

      <DemoBlock title="通过 CSS 变量进行个性化">
        <Space>
          <ListPicker color="primary" fill="outline" style={{ '--border-radius': '6px' }}>
            Primary
          </ListPicker>
          <ListPicker color="success" fill="outline" style={{ '--background-color': '#c8f7c5' }}>
            Success
          </ListPicker>
          <ListPicker color="warning" style={{ '--text-color': 'var(--adm-color-text)' }}>
            Warning
          </ListPicker>
          <ListPicker
            color="danger"
            fill="outline"
            style={{ '--border-color': 'var(--adm-color-weak)' }}
          >
            Danger
          </ListPicker>
        </Space>
      </DemoBlock>
    </>
  );
};
