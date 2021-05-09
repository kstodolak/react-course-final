import React, {useContext, useState} from 'react';
import request from "../../../helpers/request";
import {StoreContext} from "../../../store/StoreProvider";
import CoursePopup from "./CoursePopup";

const CourseDetails = props => {
    const { id, title } = props;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { setCourses } = useContext(StoreContext);
    const showPopup = () => setIsPopupOpen(true);
    const hidePopup = () => setIsPopupOpen(false);

    const deleteCourse = async () => {
        try {
            const { status } = await request.delete(`/courses/${id}`);
            if(status === 200){
                setCourses(prevState => prevState.filter(course => course.id !== id));
            }
        }catch (err){
            console.warn(err);
        }
    }

    return (
        <details>
            <summary>{ title }</summary>
            <button onClick={showPopup}>Edytuj</button>
            <button onClick={deleteCourse}>Usuń</button>
            <CoursePopup hidePopup={hidePopup} isPopupOpen={isPopupOpen} {...props}/>
        </details>
    );
};
export default CourseDetails;