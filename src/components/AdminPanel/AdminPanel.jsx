import React, {useContext, useState} from 'react';
import {StoreContext} from "../../store/StoreProvider";
import CourseDetails from "./subcomponents/CourseDetails";
import CoursePopup from "./subcomponents/CoursePopup";

const AdminPanel = () => {
    const { courses } = useContext(StoreContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const showPopup = () => setIsPopupOpen(true);
    const hidePopup = () => setIsPopupOpen(false);

    const coursesJSX = courses.map(course => <CourseDetails key={course.id} {...course}/>)

    return (
        <section>
            { coursesJSX }
            <button onClick={showPopup}>Dodaj nowy kurs</button>
            <CoursePopup isPopupOpen={isPopupOpen} isEditMode={false} hidePopup={hidePopup}/>
        </section>
    );
}
export default AdminPanel;