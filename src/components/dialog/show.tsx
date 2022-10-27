import React from 'react';
import { Dialog } from './dialog';
import { DialogShowProps, DialogShowHandler } from 'antd-mobile/es/components/dialog';
import { renderImperatively } from 'antd-mobile/es/utils/render-imperatively';

export const closeFnSet = new Set<() => void>();

export function show(props: DialogShowProps) {
  const handler: DialogShowHandler = renderImperatively(
    <Dialog
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
