import React from 'react';
import { Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type DraggableModalProps = {
  visible: boolean;
  isDraging: boolean;
  bounds: Object;
  width: number;
  title: string;
  content: object;
};

class DraggableModal extends React.Component<DraggableModalProps> {
  constructor() {
    super();
    this.state = {
      visible: false,
      isDraging: false,
      bounds: { left: 0, top: 0, bottom: 0, right: 0 },
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

  draggleRef = React.createRef();

  onDragStart = (event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = (
      this as any
    ).draggleRef?.current?.getBoundingClientRect();
    this.setState({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  render() {
    return (
      <>
        <Button
          size="small"
          icon={<PlusOutlined />}
          onClick={this.showModal}
          danger
        >
          新增分析
        </Button>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if ((this as any).state.isDraging) {
                  this.setState({ isDraging: false });
                }
              }}
              onMouseOut={() => {
                this.setState({ isDraging: true });
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              {this.props.title}
            </div>
          }
          centered
          visible={(this as any).state.visible}
          onOk={this.hdieModal}
          onCancel={this.hdieModal}
          footer={[
            <Button key="back" onClick={this.hdieModal}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.hdieModal}>
              确认
            </Button>,
          ]}
          modalRender={(modal) => (
            <Draggable
              disabled={(this as any).state.isDraging}
              bounds={(this as any).state.bounds}
              onStart={(event, uiData) => this.onDragStart(event, uiData)}
            >
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
          width={this.props.width}
        >
          {this.props.content}
        </Modal>
      </>
    );
  }
}

export default DraggableModal;
