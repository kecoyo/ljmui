import './progress-modal.less';
import { show } from './show';
import { clear } from './clear';
import { start } from './start';
import { attachPropertiesToComponent } from 'antd-mobile/es/utils/attach-properties-to-component';
import { ProgressModal } from './progress-modal';

export type { ProgressModalProps } from './progress-modal';
export type { ProgressModalShowProps, ProgressModalShowHandler } from './show';
export type { ProgressModalStartProps, ProgressModalStartHandler } from './start';

export default attachPropertiesToComponent(ProgressModal, {
  show,
  clear,
  start,
});
