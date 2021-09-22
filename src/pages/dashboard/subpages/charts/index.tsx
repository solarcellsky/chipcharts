import React from 'react';
import { Layout, Button, message } from 'antd';
import { useIntl } from 'umi';
import {
  CodeOutlined,
  SaveOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import DemoScatter from '../../components/charts';
import DemoRadar from '../../components/radar';
import DraggableModal from '../../components/DraggableModal';
import styles from './index.less';

const Charts: React.FC = () => {
  const intl = useIntl();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleSideCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleRun = () => {
    message.info('运行');
  };

  const handleSave = () => {
    message.info('保存');
  };

  const _btnGroup = (
    <div className={styles.btnGroup}>
      <Button
        size="small"
        type="primary"
        icon={<CodeOutlined />}
        onClick={handleRun}
      >
        运行
      </Button>
      <Button
        size="small"
        type="primary"
        icon={<SaveOutlined />}
        onClick={handleSave}
      >
        保存
      </Button>
      <DraggableModal
        title="新增分析图表"
        content={<DemoRadar />}
        width={1200}
      />
    </div>
  );

  return (
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
        <div className={styles.innerWrapper}>{_btnGroup}</div>
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
  );
};

export default Charts;
