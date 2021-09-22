import { Avatar, Menu, Dropdown } from 'antd';
import { SelectLang, Link } from 'umi';
import {
  UserOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import logo from '/public/assets/logo.svg';
import defaultAvatar from '/public/assets/avatar.png';
import styles from './index.less';

export default () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <SettingOutlined /> 个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <LogoutOutlined /> 退出登录
      </Menu.Item>
    </Menu>
  );

  const _routerKey = window.location.pathname.split('/')[1];

  const handleClick = (e: { key: string }) => {
    window.localStorage.setItem('roter-key', e.key);
  };

  const headerNavi = (
    <Menu onClick={handleClick} mode="horizontal">
      <Menu.Item key="product">
        <Link to="/product">产品信息管理</Link>
      </Menu.Item>
      <Menu.Item key="task">
        <Link to="/task">任务及变更</Link>
      </Menu.Item>
      <Menu.Item key="dataset">
        <Link to="/dataset">数据管理和分析</Link>
      </Menu.Item>
      <Menu.Item key="rules">
        <Link to="/rules">质量规则管理及批次处理</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <section className={styles.pageHeader}>
      <img src={logo} className={styles.logo} alt="" />
      <div className={styles.globalNavi}>
        <div className={styles.siteName}>OneData</div>
        {headerNavi}
      </div>
      <div className={styles.headerUI}>
        <div className={styles.avatar}>
          <Avatar size="small" icon={<UserOutlined />} src={defaultAvatar} />
          <span className={styles.uname}>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Admin <CaretDownOutlined />
              </a>
            </Dropdown>
          </span>
        </div>
        <div className={styles.lang} data-lang>
          {SelectLang && <SelectLang />}
        </div>
      </div>
    </section>
  );
};
