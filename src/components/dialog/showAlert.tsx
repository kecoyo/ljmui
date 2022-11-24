import { DialogAlertProps } from 'antd-mobile/es/components/dialog';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { alert } from './alert';

export function showAlert(p1: string | DialogAlertProps, p2?: string | DialogAlertProps, p3?: DialogAlertProps) {
  let props = {};

  if (typeof p1 === 'string') {
    if (p1) props = mergeProps(props, { content: p1 });
    if (p1 && p2 && typeof p2 === 'string') props = mergeProps(props, { title: p1, content: p2 });
    if (p1 && p2 && typeof p2 !== 'string') props = mergeProps(props, { content: p1 }, p2 || {});
    if (p1 && p2 && p3) props = mergeProps(props, { title: p1, content: p2 }, p3 || {});
  } else {
    props = mergeProps(props, p1 || {});
  }

  return alert({ ...props });
}
