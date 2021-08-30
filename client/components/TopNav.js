import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const { Item, SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState('');
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('user');
    const { data } = await axios.get('/api/logout');
    toast.success(data.message);
    router.push('/login');
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a className="">Home</a>
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a className="">Login</a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a className="">Register</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu icon={<UserOutlined />} title={user?.name} className="ms-auto">
          <Item onClick={logout} icon={<LogoutOutlined />} className="ms-auto">
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
