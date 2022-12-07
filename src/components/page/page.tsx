import React, { ReactNode, forwardRef, createRef, useState, useImperativeHandle, useEffect } from 'react';
import classNames from 'classnames';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'antd-mobile/es/utils/native-props';
import { NavBar, NavBarProps } from 'antd-mobile';
import { pick } from '../../utils/objects';
import ScrollView, { ScrollViewProps, ScrollViewRef } from '../scroll-view';

const classPrefix = `ljm-page`;

export type PageRef = {
  refresh: () => void;
  scrollTo(x: number, y: number, time?: number): void;
  scrollBy(deltaX: number, deltaY: number, time?: number): void;
  stop(): void;
};

export type PageProps = {
  title?: string;
  color?: 'default' | 'primary' | string;
  children?: ReactNode;
  scroll?: true | {};
  onScroll?: (e: { x: number; y: number }) => void;
  onPullDownRefresh?: () => void;
  onPullUpLoad?: () => void;
  hasMore?: boolean;
} & NavBarProps &
  ScrollViewProps &
  NativeProps;

const defaultProps = {
  color: 'default',
};

export const Page = forwardRef<PageRef, PageProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const scrollViewRef = createRef<ScrollViewRef>();

  const navBarProps = pick(props, ['back', 'backArrow', 'onBack', 'left', 'right']);
  const scrollOptions = typeof props.scroll === 'object' ? props.scroll : {};
  const scrollProps = pick(props, ['direction', 'onScroll', 'onPullDownRefresh', 'onPullUpLoad', 'hasMore']);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      scrollViewRef?.current?.refresh();
    },
    scrollTo: (x: number, y: number, time?: number) => {
      scrollViewRef?.current?.scrollTo(x, y, time);
    },
    scrollBy: (deltaX: number, deltaY: number, time?: number) => {
      scrollViewRef?.current?.scrollBy(deltaX, deltaY, time);
    },
    stop: () => {
      scrollViewRef?.current?.stop();
    },
  }));

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-${props.color}`]: props.color,
        [`${classPrefix}-notitle`]: !props.title,
        [`${classPrefix}-scroll`]: props.scroll,
      })}
    >
      <NavBar
        className={`${classPrefix}-header`}
        onBack={() => {
          window.history.go(-1);
        }}
        {...navBarProps}
      >
        {props.title && <span>{props.title}</span>}
      </NavBar>
      <div className={`${classPrefix}-content`}>
        {props.scroll ? (
          <ScrollView ref={scrollViewRef} {...scrollOptions} {...scrollProps}>
            {props.children}
          </ScrollView>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
});
