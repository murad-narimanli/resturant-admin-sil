import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    LoginOutlined
} from '@ant-design/icons';

import { Layout, Avatar, Popover, Button } from 'antd';
const { Header } = Layout;

const HeaderMain = ({ collapsed, setCollapsed , colorBgContainer }) => {

    // const text = <span>Title</span>;
    const content = (
        <div className='d-flex justify-content-between'>
        <Button className='me-1 d-flex align-items-center'> <LoginOutlined/>Log In</Button>
         <Button className='me-1 d-flex align-items-center'><LogoutOutlined/>Log Out</Button>
        </div>
    );
    return (
        <>
        <Header style={{ padding: 0, background: colorBgContainer }}>

            <div className='d-flex justify-content-between align-items-center'>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}

                <Popover placement="bottomRight" content={content} trigger="click">
                    <Avatar className='me-3' size={30} icon={<UserOutlined />} />
                </Popover>

            </div>

        </Header> 
        </>
    );
}

export default HeaderMain;
