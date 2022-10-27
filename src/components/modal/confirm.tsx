import { ModalConfirmProps } from 'antd-mobile/es/components/modal';
import { mergeProps } from 'antd-mobile/es/utils/with-default-props';
import { getDefaultConfig } from 'antd-mobile/es/components/config-provider';
import { show } from './show';

const defaultProps = {
  confirmText: '确认',
  cancelText: '取消',
};

export function confirm(p: ModalConfirmProps) {
  const { locale } = getDefaultConfig();
  const props = mergeProps(
    defaultProps,
    {
      confirmText: locale.common.confirm,
      cancelText: locale.common.cancel,
    },
    p
  );
  return new Promise<boolean>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      onClose: () => {
        props.onClose?.();
        resolve(false);
      },
      actions: [
        {
          key: 'confirm',
          text: props.confirmText,
          primary: true,
          onClick: async () => {
            await props.onConfirm?.();
            resolve(true);
          },
        },
        {
          key: 'cancel',
          text: props.cancelText,
          onClick: async () => {
            await props.onCancel?.();
            resolve(false);
          },
        },
      ],
    });
  });
}
