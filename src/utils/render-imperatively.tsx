import React, { FC, ReactElement, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type ImperativeProps = {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
};

type WrapperHandler = {
  update: (props: ImperativeProps) => void;
  close: () => void;
};

export function renderImperatively(element: ReactElement<ImperativeProps>) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const unmount = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };

  const Wrapper = React.forwardRef<WrapperHandler>((_, ref) => {
    const [visible, setVisible] = useState(false);
    const [newProps, setNewProps] = useState({});
    const closedRef = useRef(false);
    useEffect(() => {
      if (!closedRef.current) {
        setVisible(true);
      } else {
        afterClose();
      }
    }, []);
    function onUpdate(props: ImperativeProps) {
      setNewProps(props);
    }
    function onClose() {
      closedRef.current = true;
      setVisible(false);
      element.props.onClose?.();
    }
    function afterClose() {
      unmount();
      element.props.afterClose?.();
    }
    useImperativeHandle(ref, () => ({
      update: onUpdate,
      close: onClose,
    }));
    return React.cloneElement(element, {
      ...element.props,
      ...newProps,
      visible,
      onClose,
      afterClose,
    });
  });

  const wrapperRef = React.createRef<WrapperHandler>();
  ReactDOM.render(<Wrapper ref={wrapperRef} />, container);

  function update(props: ImperativeProps) {
    wrapperRef.current?.update(props);
  }

  function close() {
    wrapperRef.current?.close();
  }

  return {
    update,
    close,
  };
}
