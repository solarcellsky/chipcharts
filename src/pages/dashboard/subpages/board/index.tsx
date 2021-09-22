import React from 'react';
import { Layout, Button } from 'antd';
import styles from './index.less';

const Board: React.FC = () => {
  return (
    <Layout className={styles.mainContent}>
      <h2 className={styles.blankTitle}>看板管理</h2>
    </Layout>
  );
};

export default Board;
