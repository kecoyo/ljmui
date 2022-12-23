import React from 'react';
import { WebViewPage } from 'ljmui2';
import { DemoBlock } from 'demos';

import styles from './demo1.less';

const url = 'https://www.ljlx.com/ljlx/public/userprivacy.html';

export default () => {
  return <WebViewPage src={url} />;
};
