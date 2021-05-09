import React, {useContext} from 'react';
import CourseStyles from './Course.module.scss';
import bemCssModules from "bem-css-modules";
import request from "../../helpers/request";
import {StoreContext} from "../../store/StoreProvider";
import { useHistory } from 'react-router-dom';

const style = bemCssModules(CourseStyles);

const Course = props => {
    const {
        id,
        authors,
        img,
        price,
        title,
        isUserContext
    } = props;

    const { user, setUser } = useContext(StoreContext);
    const history = useHistory();

    const isUserLogged = Boolean(user);

    const allAuthorsString = authors.join(', ');


    const btnClickHandle = async () => {
        try {
            const { data, status } = await request.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id
                }
            );

            if(status === 202){
                setUser(data.user);
                history.push('/my-courses');
            }

        }catch (err){
            console.warn(err);
        }



    }

    return (
        <li>
            <article className={style()}>
                <h3 className={style('title')}>{ authors }</h3>
                <img src={img} alt={title}/>
                <p className={style('price')}>
                    Koszt kursu: { price }zł
                </p>
                <p className={style('authors')}>
                    Autorzy: { allAuthorsString }
                </p>
                {
                    !isUserContext && isUserLogged &&
                        <button onClick={btnClickHandle}>Kup teraz!</button>
                }
            </article>
        </li>
    );
}
export default Course;