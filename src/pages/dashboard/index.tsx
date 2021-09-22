import React from 'react';
import { Tabs } from 'antd';
import DataSet from './subpages/dataset';
import Charts from './subpages/charts';
import Board from './subpages/Board';
import styles from './index.less';

const DashBoard: React.FC = () => {
  const { TabPane } = Tabs;

  return (
    <Tabs
      defaultActiveKey="1"
      size="small"
      tabBarStyle={{
        padding: '0 20px',
        margin: '0 0 0 0',
        borderBottom: '1px solid #CCCCCC',
        backgroundColor: '#f0f2f5',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <TabPane tab="数据集" key="1">
        <DataSet />
      </TabPane>
      <TabPane tab="分析图表" key="2">
        <Charts />
      </TabPane>
      <TabPane tab="看板管理" key="3">
        <Board />
      </TabPane>
    </Tabs>
  );
};

export default DashBoard;
