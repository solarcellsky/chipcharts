import React from 'react';
import {
  Layout,
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Input,
  Pagination,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import NewDataSet from './new';
import styles from './index.less';

const DataSet: React.FC = () => {
  const { Content } = Layout;
  const { Search } = Input;

  const handleEditDataSet = (record: Object) => {
    console.log(record);
    message.info('编辑数据集');
  };

  const confirmDelete = (record: { id: any; name: String }) => {
    console.log(record);
    message.success('数据集【' + record.name + '】已删除');
  };

  const cancelDelete = () => {
    message.error('操作已取消');
  };

  const columns = [
    {
      title: '数据集名称',
      dataIndex: 'name',
      key: 'name',
      with: 260,
    },
    {
      title: '数据集描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      key: 'creater',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 220,
    },
    {
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier',
    },
    {
      title: '修改时间',
      dataIndex: 'modifyAt',
      key: 'modifyAt',
      width: 220,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: (record: Object) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={handleEditDataSet.bind(this, record)}
          >
            修改
          </Button>
          <Popconfirm
            title="Are you sure to delete this dataset?"
            onConfirm={confirmDelete.bind(this, record)}
            onCancel={cancelDelete}
            okText="Yes"
            cancelText="No"
            placement="rightTop"
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: '1',
      key: '1',
      name: 'Demo_DataSet_001',
      description: 'This is a demo dataset',
      creater: 'Lisi',
      createAt: '2021-09-15 08:01:46',
      modifier: 'Park',
      modifyAt: '2021-09-15 10:11:32',
    },
    {
      id: '2',
      key: '2',
      name: 'Demo_DataSet_002',
      description: 'This is a demo dataset',
      creater: 'Lisi',
      createAt: '2021-09-15 08:01:46',
      modifier: 'Park',
      modifyAt: '2021-09-15 10:11:32',
    },
    {
      id: '3',
      key: '3',
      name: 'Demo_DataSet_003',
      description: 'This is a demo dataset',
      creater: 'Lisi',
      createAt: '2021-09-15 08:01:46',
      modifier: 'Park',
      modifyAt: '2021-09-15 10:11:32',
    },
  ];

  const _width = window.innerWidth;

  const toolBtns = (
    <Space size="large" direction="horizontal">
      <NewDataSet title="新增数据集" width={_width} />
      <Search
        placeholder="Input search text"
        style={{ width: 260 }}
        size="middle"
      />
    </Space>
  );

  return (
    <Layout className={styles.mainContent}>
      <Content>
        <div className={styles.blankTitle}>{toolBtns}</div>
        <div className={styles.mainTable}>
          <Table columns={columns} dataSource={data} size="small" bordered />
        </div>
      </Content>
    </Layout>
  );
};

export default DataSet;
