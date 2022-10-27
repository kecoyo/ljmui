import React, { FC } from 'react';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { Action } from 'antd-mobile/es/components/modal/modal-action-button';
import AdmDialog, { DialogProps } from 'antd-mobile/es/components/dialog';
import { useUpdateEffect } from 'ahooks';
import Event from '../event';
import { EVENT_POPUP_CLOSE } from '../popup/popup';

const defaultProps = {
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  getContainer: null,
};

export const Dialog: FC<DialogProps> = p => {
  const props = mergeProps(defaultProps, p);

  useUpdateEffect(() => {
    if (props.onClose) {
      if (props.visible) {
        Event.addListener(EVENT_POPUP_CLOSE, props.onClose);
      } else {
        Event.removeListener(EVENT_POPUP_CLOSE, props.onClose);
      }
    }
  }, [props.visible]);

  return <AdmDialog {...props} />;
};
