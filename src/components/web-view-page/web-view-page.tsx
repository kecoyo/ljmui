import React, { FC } from 'react';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { withNativeProps } from 'antd-mobile/es/utils/native-props';
import Page, { PageProps } from '../page';
import WebView from '../web-view';

const classPrefix = `ljm-web-view-page`;

export type WebViewPageProps = {
  src: string;
} & PageProps;

const defaultProps = {};

export const WebViewPage: FC<WebViewPageProps> = p => {
  const props = mergeProps(defaultProps, p);
  const { src, ...otherProps } = props;
  return withNativeProps(
    props,
    <Page className={classPrefix} {...otherProps}>
      <WebView src={src} />
    </Page>
  );
};
