import { Modal } from './modal';
import { attachPropertiesToComponent } from 'antd-mobile/es/utils/attach-properties-to-component';
import { show } from './show';
import { alert } from './alert';
import { confirm } from './confirm';
import { clear } from './clear';

export default attachPropertiesToComponent(Modal, {
  show,
  alert,
  confirm,
  clear,
});
