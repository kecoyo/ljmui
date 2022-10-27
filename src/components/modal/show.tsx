import React from 'react';
import { Modal } from './modal';
import { ModalShowProps, ModalShowHandler } from 'antd-mobile/es/components/modal';
import { renderImperatively } from 'antd-mobile/es/utils/render-imperatively';

export const closeFnSet = new Set<() => void>();

export const EVENT_MODAL_CLOSE = 'event-modal-close';

export function show(props: ModalShowProps) {
  const handler: ModalShowHandler = renderImperatively(
    <Modal
      {...props}
      afterClose={() => {
        closeFnSet.delete(handler.close);
        props.afterClose?.();
      }}
    />
  );
  closeFnSet.add(handler.close);
  return handler;
}
