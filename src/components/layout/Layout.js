import { Layout, theme} from 'antd';
import React, { useState } from 'react';
import MenuItems from '../elements/MenuItems';
import HeaderMain from './Header';
const { Sider, Content } = Layout;


const MainLayout = (props) => {
    const [collapsed, setCollapsed] = useState({});

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <MenuItems/>
            </Sider>

            <Layout className="site-layout">
                <HeaderMain colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed}/>
                <Content
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: '80vh',
                    background: colorBgContainer,
                    }}
                >
                    {props.children}
                    Content
                </Content>

            </Layout>
        </Layout>
    );
};
export default MainLayout;
