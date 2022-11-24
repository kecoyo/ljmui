import { show } from './show';
import { alert } from './alert';
import { confirm } from './confirm';
import { clear } from './clear';
import { attachPropertiesToComponent } from 'antd-mobile/es/utils/attach-properties-to-component';
import { Dialog } from './dialog';
import { showAlert } from './showAlert';
import { showConfirm } from './showConfirm';

export { showAlert, showConfirm };

export default attachPropertiesToComponent(Dialog, {
  show,
  alert,
  confirm,
  clear,
  showAlert,
  showConfirm,
});
