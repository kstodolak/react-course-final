import React, {useContext} from 'react';
import UserCoursesStyles from './UserCourses.module.scss';
import bemCssModules from "bem-css-modules";
import {StoreContext} from "../../store/StoreProvider";
import Course from "../Course/Course";

const style = bemCssModules(UserCoursesStyles);

const UserCourses = () => {
    const { user, courses } = useContext(StoreContext);
    const buyedCoursesJSX = courses
        .filter(course => user.courses.includes(course.id))
        .map(course => <Course isUserContext={true} key={course.id} {...course}/>);


    return (
        <section className={style()}>
            <h2 className={style('title')}>Twoje wykupione kursy</h2>
            <ul className={style('list')}>
                { buyedCoursesJSX.length
                    ? buyedCoursesJSX
                    : 'Nie masz jeszcze kursików mordo'
                }
            </ul>
        </section>
    );
}
export default UserCourses;