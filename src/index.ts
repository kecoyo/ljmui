import './global';

export * from 'antd-mobile';

export { default as Event } from './components/event';
export { default as Popup, EVENT_POPUP_CLOSE } from './components/popup';
export { default as Modal } from './components/modal';
export { default as Dialog, showAlert, showConfirm } from './components/dialog';
export { default as Icon } from './components/icon';
export { default as Page } from './components/page';
export { default as WebView } from './components/web-view';
export { default as WebViewPage } from './components/web-view-page';
export { default as ScrollView } from './components/scroll-view';
export { default as TabsPage } from './components/tabs-page';

export * from './utils';
