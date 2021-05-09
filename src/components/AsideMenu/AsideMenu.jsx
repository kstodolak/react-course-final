import React, {useContext} from 'react';
import {default as AsideMenuStyles} from './AsideMenu.module.scss';
import bemCssModules from "bem-css-modules";
import {StoreContext} from "../../store/StoreProvider";
import AdminMenu from "./subcomponents/AdminMenu";
import UserMenu from "./subcomponents/UserMenu";

const style = bemCssModules(AsideMenuStyles);

const ADMIN_LEVEL = 1;

const AsideMenu = () => {
    const { user } = useContext(StoreContext);

    const adminMenuComponent = user?.accessLevel === ADMIN_LEVEL
        ? <AdminMenu/>
        : null;

    return (
        <section className={style()}>
            <div className={style('nav-wrapper')}>
                <UserMenu isUserLogged={Boolean(user)}/>
                { adminMenuComponent }
            </div>
        </section>
    );
}
export default AsideMenu;