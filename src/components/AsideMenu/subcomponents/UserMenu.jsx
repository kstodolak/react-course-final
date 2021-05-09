import React from 'react';
import {default as AsideMenuStyles} from '../AsideMenu.module.scss';
import bemCssModules from "bem-css-modules";
import {Link} from "react-router-dom";
const style = bemCssModules(AsideMenuStyles);

const UserMenu = ({ isUserLogged }) => {
    return (
        <>
            <p className={style('title')}>Panel Użytkownika</p>
            <nav>
                <ul className={style('nav-list')}>
                    <li>
                        <Link to="/" className={`${style('nav-list')}__link`}>Kursy w sprzedaży</Link>
                    </li>
                    { isUserLogged && (
                        <li>
                            <Link to="/my-courses" className={`${style('nav-list')}__link`}>Moje kursy</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}
export default UserMenu;