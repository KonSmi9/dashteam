import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import ExitIcon from '../../shared/assets/header/exit.svg';
import './Header.scss';

interface HeaderComponentProps {
    children?: ReactNode;
}
export const HeaderComponent = ({ children }: HeaderComponentProps) => {
    const onLogout = () => {
        console.log('Logout');
    };

    return (
        <header className={'header'}>
            {children}
            <div className={'header__menu'}>
                <Link
                    to="/dashboard/user"
                    className="header__menu__profile"
                >
                    <div className="header__menu__profile__avatar">
                        AS
                    </div>
                </Link>
                <ExitIcon
                    onClick={onLogout}
                    className="header__menu__icon"
                />
            </div>
        </header>
    );
};
