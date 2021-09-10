import { Layout, Avatar, Menu, Dropdown } from 'antd';
import { useIntl, SelectLang } from 'umi';
import {
  UserOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import logo from '/public/assets/logo.png';
import defaultAvatar from '/public/assets/default.jpg';
import styles from './index.less';

export default () => {
  const { Header } = Layout;
  const intl = useIntl();

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

  return (
    <Header className={styles.pageheader}>
      <img src={logo} className={styles.logo} alt="" />
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
    </Header>
  );
};
