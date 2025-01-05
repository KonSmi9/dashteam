import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const { Title } = Typography;
const { Content } = Layout;

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = (values: { username: string; password: string }) => {
        if (login(values)) {
            navigate('/dashboard/tables');
        } else {
            alert('Invalid username or password!');
        }
    };


    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Content>
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                        <Card style={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                <Title level={3}>Welcome Back</Title>
                                <p style={{ color: 'rgba(0,0,0,0.45)' }}>Please log in to your account</p>
                            </div>
                            <Form
                                name="login"
                                onFinish={onFinish}
                                initialValues={{ remember: true }}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="Логин"
                                    name="username"
                                    rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Логин" />
                                </Form.Item>

                                <Form.Item
                                    label="Пароль"
                                    name="password"
                                    rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                                </Form.Item>

                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Запомнить меня</Checkbox>
                                    </Form.Item>
                                    <a href="/forgot-password" style={{ float: 'right' }}>
                                        Забыли пароль?
                                    </a>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Вход
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div style={{ textAlign: 'center', marginTop: 16 }}>
                                <p>
                                    У вас нет учетной записи? <a href="/register">Зарегистрируйтесь сейчас</a>
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default LoginPage;
