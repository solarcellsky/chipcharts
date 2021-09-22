import React from 'react';
import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { DrawerProps } from 'antd/es/drawer';

type NewDataSetProps = {
  visible: boolean;
  isDraging: boolean;
  bounds: Object;
  width: number;
  title: string;
  content: object;
};

class NewDataSet extends React.Component<NewDataSetProps> {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hdieModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button
          size="middle"
          icon={<PlusOutlined />}
          onClick={this.showModal}
          type="primary"
        >
          新增数据集
        </Button>
        <Drawer
          title={this.props.title}
          placement="right"
          visible={(this as any).state.visible}
          onClose={this.hdieModal}
          width={this.props.width}
        >
          {this.props.content}
        </Drawer>
      </>
    );
  }
}

export default NewDataSet;
