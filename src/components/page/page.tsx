import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import { NavBar } from 'antd-mobile';
import { pick } from '../../utils/objects';

const classPrefix = `ljm-page`;

export type PageProps = {
  title?: string;
  color?: 'default' | 'primary' | string;
  children?: ReactNode;

  // NavBarProps
  back?: ReactNode;
  backArrow?: boolean | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
} & NativeProps<'--width' | '--height'>;

const defaultProps = {
  color: 'default',
};

export const Page: FC<PageProps> = p => {
  const props = mergeProps(defaultProps, p);

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-${props.color}`]: props.color,
        [`${classPrefix}-notitle`]: !props.title,
      })}
    >
      <NavBar
        className={`${classPrefix}-header`}
        onBack={() => {
          window.history.go(-1);
        }}
        // NavBarProps
        {...pick(props, ['back', 'backArrow', 'onBack', 'left', 'right'])}
      >
        {props.title && <span>{props.title}</span>}
      </NavBar>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </div>
  );
};
