import React, {useContext} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {default as ContentStyles} from './Content.module.scss';
import bemCssModules from "bem-css-modules";
import {StoreContext} from "../../store/StoreProvider";
import Courses from "../Courses/Courses";
import UserCourses from "../UserCourses/UserCourses";
import AdminPanel from "../AdminPanel/AdminPanel";

const style = bemCssModules(ContentStyles);
const ADMIN_LEVEL = 1;

const Content = () => {

    const { user } = useContext(StoreContext);

    const isUserLogged = Boolean(user);
    const isAdmin = user?.accessLevel === ADMIN_LEVEL;

    return (
        <main className={style()}>
            <Switch>
                <Route exact path="/">
                    <Courses/>
                </Route>
                { isUserLogged &&
                    <Route path="/my-courses">
                        <UserCourses/>
                    </Route>
                }
                { isAdmin &&
                <Route path="/manage-courses">
                    <AdminPanel/>
                </Route>
                }
                <Redirect to="/"/>
            </Switch>
        </main>
    );
}
export default Content;