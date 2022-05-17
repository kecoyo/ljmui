import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal, Space, ProgressBar, AutoCenter } from 'antd-mobile';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import { ModalProps } from 'antd-mobile/es/components/modal/modal';
import { Action, ModalActionButton } from 'antd-mobile/es/components/modal/modal-action-button';

const classPrefix = 'ljmui-progress-modal';

export type ProgressModalProps = {
  percent?: number;
  message?: string;
} & ModalProps;

const defaultProps = {
  percent: 0,
  message: '数据处理中...',
};

export const ProgressModal: FC<ProgressModalProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const content = (
    <Space className={`${classPrefix}-content`} direction="vertical">
      <div className={`${classPrefix}-message`}>{props.message}</div>
      <ProgressBar percent={props.percent} />
      <div className={`${classPrefix}-percent`}>{props.percent}%</div>
    </Space>
  );

  return withNativeProps(
    props,
    <Modal className={classNames(classPrefix)} content={content} {...props} />,
  );
};
