import React, { FC } from 'react';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import AdmPopup, { PopupProps } from 'antd-mobile/es/components/popup';
import { defaultPopupBaseProps } from 'antd-mobile/es/components/popup/popup-base-props';
import { useUpdateEffect } from 'ahooks';
import Event, { EVENT_POPUP_CLOSE } from '../event';

const defaultProps = {
  ...defaultPopupBaseProps,
  position: 'bottom',
};

export const Popup: FC<PopupProps> = p => {
  const props = mergeProps(defaultProps, p);

  useUpdateEffect(() => {
    if (props.onClose) {
      if (props.visible) {
        Event.addListener(EVENT_POPUP_CLOSE, props.onClose);
      } else {
        Event.removeListener(EVENT_POPUP_CLOSE, props.onClose);
      }
    } else if (props.onMaskClick) {
      if (props.visible) {
        Event.addListener(EVENT_POPUP_CLOSE, props.onMaskClick);
      } else {
        Event.removeListener(EVENT_POPUP_CLOSE, props.onMaskClick);
      }
    }
  }, [props.visible]);

  return <AdmPopup {...props} />;
};
