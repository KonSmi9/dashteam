import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

const Dashboard = () => {
    return (
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Добро пожаловать в дашборд!</div>
        </Content>
    );
};

export default Dashboard;
