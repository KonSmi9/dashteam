import { DatabaseFilled, IdcardFilled, LayoutFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import './MenuRouting.scss';

export const MenuWithRouting = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: '1',
            icon: <DatabaseFilled />,
            label: 'Таблицы',
            path: '/dashboard/tables',
        },
        {
            key: '2',
            icon: <LayoutFilled />,
            label: 'Справочники',
            path: '/dashboard/references',
        },
        {
            key: '3',
            icon: <IdcardFilled />,
            label: 'Пользователи',
            path: '/dashboard/users',
        },
    ];

    return (
        <Menu
            className="side-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
                const menuItem = menuItems.find((item) => item.key === key);
                navigate(menuItem.path);

            }}
            items={menuItems}
        />
    );
};
