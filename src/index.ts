import './global';

export * from 'antd-mobile';

export { default as Event } from './components/event';
export { default as Popup, EVENT_POPUP_CLOSE } from './components/popup';
export { default as Modal } from './components/modal';
export { default as Dialog, showAlert, showConfirm } from './components/dialog';
export { default as Icon } from './components/icon';
export type { IconProps } from './components/icon';
export { default as WebView } from './components/web-view';
export type { WebViewProps } from './components/web-view';

export * from './utils';
