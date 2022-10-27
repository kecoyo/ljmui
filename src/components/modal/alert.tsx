import { ModalAlertProps } from 'antd-mobile/es/components/modal';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { getDefaultConfig } from 'antd-mobile/es/components/config-provider';
import { show } from './show';

export function alert(p: ModalAlertProps) {
  const defaultProps = {
    confirmText: getDefaultConfig().locale.Modal.ok,
  };
  const props = mergeProps(defaultProps, p);
  return new Promise<void>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      actions: [
        {
          key: 'confirm',
          text: props.confirmText,
          primary: true,
        },
      ],
      onAction: props.onConfirm,
      onClose: () => {
        props.onClose?.();
        resolve();
      },
    });
  });
}
