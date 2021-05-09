import React, {useContext} from 'react';
import CoursesStyles from './Courses.module.scss';
import bemCssModules from "bem-css-modules";
import {StoreContext} from "../../store/StoreProvider";
import Course from "../Course/Course";

const style = bemCssModules(CoursesStyles);

const Courses = () => {

    const { courses } = useContext(StoreContext);

    const coursesJSX = courses.map(course => <Course key={course.id}  {...course}/>);

    return (
        <section className={style()}>
            <h2 className={style('title')}>Dostępne kursy</h2>
            <ul className={style('list')}>{ coursesJSX }</ul>
        </section>
    );
}
export default Courses;