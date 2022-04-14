import React, { Props } from 'react';
import { Button } from 'antd-mobile';
import './index.less';

const classPrefix = 'ljmui-foo';

export type FooProps = {
  title?: string;
};

class Foo extends React.PureComponent<FooProps> {
  constructor(props: FooProps) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <div className={classPrefix}>
        <Button color="primary">{title}</Button>
      </div>
    );
  }
}

export default Foo;
