import React from 'react';
import { Layout, Button } from 'antd';
import { useIntl } from 'umi';
import {
  CodeOutlined,
  SaveOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import PageHeader from '@/components/PageHeader';
import DemoScatter from './components/charts';
import DemoRadar from './components/radar';
import D3Demo from './components/D3Demo';
import styles from './index.less';

const DashBoard: React.FC = () => {
  const intl = useIntl();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleSideCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <PageHeader />
      <Layout className={styles.mainContent}>
        <div
          className={
            collapsed ? styles.cols + ' ' + styles.collapsed : styles.cols
          }
        >
          <div className={styles.innerWrapper}>
            <h5>{intl.formatMessage({ id: 'pages.dashboard.dataset' })}</h5>
            <Button
              size="small"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className={styles.colBtn}
              onClick={handleSideCollapse}
            />
          </div>
        </div>
        <div className={styles.cols}>
          <div className={styles.innerWrapper}>
            <div>
              <Button size="small" icon={<CodeOutlined />}>
                RUN
              </Button>
              <Button size="small" icon={<SaveOutlined />}>
                SAVE
              </Button>
            </div>
            <D3Demo />
          </div>
        </div>
        <div
          className={
            collapsed ? styles.cols + ' ' + styles.collapsed : styles.cols
          }
        >
          <div className={styles.innerWrapper}>
            <h5>Result</h5>
            <DemoScatter />
            <DemoRadar />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
