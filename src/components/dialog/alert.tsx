import { show } from './show';
import { DialogAlertProps } from 'antd-mobile/es/components/dialog';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { getDefaultConfig } from 'antd-mobile/es/components/config-provider';

export function alert(p: DialogAlertProps) {
  const defaultProps = {
    confirmText: getDefaultConfig().locale.Dialog.ok,
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
