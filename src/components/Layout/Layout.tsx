import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ReferencePage } from '../../pages/ReferencesPage/ReferencesPage';
import { TablePage } from '../../pages/TablePage/TablePage';
import { UserPage } from '../../pages/UserPage/UserPage';
import { HeaderComponent } from '../Header/Header';
import { MenuWithRouting } from '../MenuRouting/MenuRouting';

import './Layout.scss';


const { Sider, Content } = Layout;
const LayoutComponent = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSider = () => {
        setCollapsed(!collapsed);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={'container'}>
                    <Button
                        className={'container-button'}
                        shape="circle"
                        icon={collapsed ? <RightCircleFilled /> : <LeftCircleFilled /> }
                        onClick={toggleSider}
                    />
                </div>
                <MenuWithRouting/>
            </Sider>
            <Layout>
                <HeaderComponent />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Routes>
                        <Route path="tables" element={<TablePage />} />
                        <Route path="references" element={<ReferencePage />}/>
                        <Route path="users" element={<UserPage />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;
