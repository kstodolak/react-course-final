import React from 'react';
import {default as AsideMenuStyles} from '../AsideMenu.module.scss';
import bemCssModules from "bem-css-modules";
import {Link} from "react-router-dom";
const style = bemCssModules(AsideMenuStyles);

const AdminMenu = () => {
    return (
        <>
            <p className={style('title')}>Panel Administratora</p>
            <nav>
                <ul className={style('nav-list')}>
                    <li>
                        <Link to="/manage-courses" className={`${style('nav-list')}__link`}>Zarządzanie kursami</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
export default AdminMenu;