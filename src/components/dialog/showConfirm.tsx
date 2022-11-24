import { DialogConfirmProps } from 'antd-mobile/es/components/dialog';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { confirm } from './confirm';

export function showConfirm(p1: string | DialogConfirmProps, p2?: string | DialogConfirmProps, p3?: DialogConfirmProps) {
  let props = {};

  if (typeof p1 === 'string') {
    if (p1) props = mergeProps(props, { content: p1 });
    if (p1 && p2 && typeof p2 === 'string') props = mergeProps(props, { title: p1, content: p2 });
    if (p1 && p2 && typeof p2 !== 'string') props = mergeProps(props, { content: p1 }, p2 || {});
    if (p1 && p2 && p3) props = mergeProps(props, { title: p1, content: p2 }, p3 || {});
  } else {
    props = mergeProps(props, p1 || {});
  }

  return confirm({ ...props });
}
