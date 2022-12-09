import React, { ReactNode, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import { Tabs, TabsProps } from 'antd-mobile/es/components/tabs/tabs';
import { Page } from '../page/page';
import { pick } from '../../utils/objects';

const classPrefix = `ljm-tabs-page`;

export type TabsPageRef = {};

export type TabsPageProps = {
  color?: 'default' | 'primary' | string;
  children?: ReactNode;
} & TabsProps &
  NativeProps;

const defaultProps = {
  color: 'default',
};

export const TabsPage = forwardRef<TabsPageRef, TabsPageProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const navBarProps = pick(props, ['back', 'backArrow', 'onBack', 'left', 'right']);
  const tabsProps = pick(props, ['activeKey', 'defaultActiveKey', 'activeLineMode', 'stretch', 'onChange']);

  useImperativeHandle(ref, () => ({}));

  return withNativeProps(
    props,
    <Page
      className={classNames(classPrefix, {
        [`${classPrefix}-${props.color}`]: props.color,
      })}
      color={props.color}
      {...navBarProps}
    >
      <Tabs {...tabsProps}>{props.children}</Tabs>
    </Page>
  );
});
