import React, { FC } from 'react';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { Action } from 'antd-mobile/es/components/modal/modal-action-button';
import AdmModal, { ModalProps } from 'antd-mobile/es/components/modal';
import { useUpdateEffect } from 'ahooks';
import Event from '../event';

export const EVENT_MODAL_CLOSE = 'event-modal-close';

const defaultProps = {
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  getContainer: null,
};

export const Modal: FC<ModalProps> = p => {
  const props = mergeProps(defaultProps, p);

  useUpdateEffect(() => {
    if (props.onClose) {
      if (props.visible) {
        Event.addListener(EVENT_MODAL_CLOSE, props.onClose);
      } else {
        Event.removeListener(EVENT_MODAL_CLOSE, props.onClose);
      }
    }
  }, [props.visible]);

  return <AdmModal {...props} />;
};
