import React from 'react';
import { Layout, Button } from 'antd';
import {
  CodeOutlined,
  SaveOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import DemoScatter from './components/charts';
import DemoRadar from './components/radar';
import logo from '/public/assets/logo.png';
import styles from './index.less';

export default class DashBoard extends React.Component {
  state = {
    size: 'small',
    collapsed: false,
  };

  handleSideCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { Header } = Layout;
    const { size, collapsed } = this.state;
    return (
      <>
        <Layout>
          <Header className={styles.pageheader}>
            <img src={logo} className={styles.logo} alt="" />
          </Header>
          <Layout className={styles.mainContent}>
            <div
              className={
                collapsed ? styles.cols + ' ' + styles.collapsed : styles.cols
              }
            >
              <div className={styles.innerWrapper}>
                <h5>Dataset</h5>
                <Button
                  size={size}
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  className={styles.colBtn}
                  onClick={this.handleSideCollapse}
                />
              </div>
            </div>
            <div className={styles.cols}>
              <div className={styles.innerWrapper}>
                <div>
                  <Button size={size} icon={<CodeOutlined />}>
                    RUN
                  </Button>
                  <Button size={size} icon={<SaveOutlined />}>
                    SAVE
                  </Button>
                </div>
                <DemoScatter />
                <DemoRadar />
              </div>
            </div>
            <div
              className={
                collapsed ? styles.cols + ' ' + styles.collapsed : styles.cols
              }
            >
              <div className={styles.innerWrapper}>
                <h5>Result</h5>
              </div>
            </div>
          </Layout>
        </Layout>
      </>
    );
  }
}
