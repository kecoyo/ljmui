import React from 'react';
import { Button, Space, Toast, Divider } from 'antd-mobile';
import { DemoBlock, DemoDescription, sleep } from 'demos';
import { Dialog, showAlert, showConfirm } from 'ljmui2';

export default () => {
  return (
    <>
      <DemoBlock title='showAlert'>
        <Space direction='vertical' block>
          <Button block onClick={() => showAlert('人在天边月上明')}>
            参数：内容
          </Button>
          <Button block onClick={() => showAlert('提示', '人在天边月上明')}>
            参数：标题、内容
          </Button>
          <Button block onClick={() => showAlert('点击遮罩关闭的对话框', { closeOnMaskClick: true })}>
            参数：内容、自定义
          </Button>
          <Button block onClick={() => showAlert('提示', '点击遮罩关闭的对话框', { closeOnMaskClick: true })}>
            参数：标题、内容、自定义
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title='showConfirm'>
        <Space direction='vertical' block>
          <Button block onClick={() => showConfirm('人在天边月上明')}>
            参数：内容
          </Button>
          <Button block onClick={() => showConfirm('提示', '人在天边月上明')}>
            参数：标题、内容
          </Button>
          <Button block onClick={() => showConfirm('点击遮罩关闭的对话框', { closeOnMaskClick: true })}>
            参数：内容、自定义
          </Button>
          <Button block onClick={() => showConfirm('提示', '点击遮罩关闭的对话框', { closeOnMaskClick: true })}>
            参数：标题、内容、自定义
          </Button>
        </Space>
      </DemoBlock>
    </>
  );
};
