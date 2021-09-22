import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';

const Product: React.FC = () => {
  return (
    <Layout className={styles.mainContent}>
      <h1>Product Information Management</h1>
    </Layout>
  );
};

export default Product;
