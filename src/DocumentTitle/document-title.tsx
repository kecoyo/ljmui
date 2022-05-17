import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';

const classPrefix = 'ljmui-progress-modal';

export type DocumentTitleProps = {
  title?: string;
};

const defaultProps = {
  title: 'ljmui2',
};

export const DocumentTitle: FC<DocumentTitleProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  if (props.title !== document.title) {
    document.title = props.title;
  }

  return <>{props.children}</>;
};
