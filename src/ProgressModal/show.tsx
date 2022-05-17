import React from 'react';
import { ProgressModal, ProgressModalProps } from './progress-modal';
import { renderImperatively } from '../utils';

export type ProgressModalShowProps = Omit<ProgressModalProps, 'visible'>;

export type ProgressModalShowHandler = {
  update: (props: ProgressModalProps) => void;
  close: () => void;
};

export const closeFnSet = new Set<() => void>();

export function show(props: ProgressModalShowProps) {
  const handler: ProgressModalShowHandler = renderImperatively(
    <ProgressModal
      {...props}
      afterClose={() => {
        closeFnSet.delete(handler.close);
        props.afterClose?.();
      }}
    />,
  );
  closeFnSet.add(handler.close);
  return handler;
}
