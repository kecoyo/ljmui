import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Button from 'antd-mobile/es/components/button';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';

export type Action = {
  key: string | number;
  text: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  bold?: boolean;
  onClick?: () => void | Promise<void>;
} & NativeProps;

export const ModalActionButton: FC<{
  action: Action;
  onAction: () => void | Promise<void>;
}> = props => {
  const { action } = props;

  return withNativeProps(
    props.action,
    <Button
      key={action.key}
      onClick={props.onAction}
      className={classNames('adm-modal-button', {
        'adm-modal-button-bold': action.bold,
      })}
      fill='none'
      shape='rectangular'
      block
      color={action.danger ? 'danger' : 'primary'}
      loading='auto'
      disabled={action.disabled}
    >
      {action.text}
    </Button>
  );
};
