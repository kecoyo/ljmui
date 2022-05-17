import React from 'react';
import { Space } from 'antd-mobile';
import { DemoBlock } from '../../demos';
import { ScrollView } from 'ljmui2';

export default () => {
  return (
    <>
      <DemoBlock title="基本用法">
        <ScrollView>123</ScrollView>
      </DemoBlock>

      <DemoBlock title="默认提供 5 种通用标签颜色">
        <Space>
          <ScrollView color="default">Default</ScrollView>
          <ScrollView color="primary">测试</ScrollView>
          <ScrollView color="success">Success</ScrollView>
          <ScrollView color="warning">Warning</ScrollView>
          <ScrollView color="danger">Danger</ScrollView>
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <Space>
          <ScrollView color="#2db7f5">#2db7f5</ScrollView>
          <ScrollView color="#87d068">#87d068</ScrollView>
          <ScrollView color="#108ee9">#108ee9</ScrollView>
        </Space>
      </DemoBlock>
      <DemoBlock title="线框填充">
        <Space>
          <ScrollView color="primary" fill="outline">
            Primary
          </ScrollView>
          <ScrollView color="#87d068" fill="outline">
            #87d068
          </ScrollView>
          <ScrollView color="#ff6430" fill="outline">
            #ff6430
          </ScrollView>
        </Space>
      </DemoBlock>

      <DemoBlock title="圆角">
        <ScrollView round color="#2db7f5">
          kongxin
        </ScrollView>
      </DemoBlock>

      <DemoBlock title="通过 CSS 变量进行个性化">
        <Space>
          <ScrollView color="primary" fill="outline" style={{ '--border-radius': '6px' }}>
            Primary
          </ScrollView>
          <ScrollView color="success" fill="outline" style={{ '--background-color': '#c8f7c5' }}>
            Success
          </ScrollView>
          <ScrollView color="warning" style={{ '--text-color': 'var(--adm-color-text)' }}>
            Warning
          </ScrollView>
          <ScrollView
            color="danger"
            fill="outline"
            style={{ '--border-color': 'var(--adm-color-weak)' }}
          >
            Danger
          </ScrollView>
        </Space>
      </DemoBlock>
    </>
  );
};
