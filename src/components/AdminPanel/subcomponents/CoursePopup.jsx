import React, {useContext, useState} from 'react';
import Modal from "../../Modal/Modal";
import CoursePopupStyles from './CoursePopup.module.scss';
import bemCssModules from "bem-css-modules";
import request from "../../../helpers/request";
import {StoreContext} from "../../../store/StoreProvider";

const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({
    hidePopup, isEditMode = true, isPopupOpen,
    id, authors = [], img = '', price = 0, title = ''
}) => {
    const { setCourses } = useContext(StoreContext);

    //NOTE: form handling
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setFormAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);
    const authorChange = e => setFormAuthor(e.target.value);
    const imgChange = e => setFormImg(e.target.value);
    const priceChange = e => setFormPrice(e.target.value);
    const titleChange = e => setFormTitle(e.target.value);

    const onSubmitHandle = async e => {
        e.preventDefault();
        const courseObject = {
            authors: formAuthors,
            img: formImg,
            title: formTitle,
            price: formPrice
        }

        if(isEditMode){
            courseObject.id = id;
            const { data, status } = await request.put('/courses', courseObject);
            if(status === 202){
                setCourses(data.courses);
            }
        }else{
            const { data, status } = await request.post('/courses', courseObject);
            if(status === 201){
                setCourses(data.courses);
            }
        }

        hidePopup();
    }

    const addAuthor = () =>{
        setFormAuthors(prev => [...prev, formAuthor]);
        setFormAuthor('');
    }
    const deleteAuthor = e => {
        const authorToDelete = e.target.dataset.author;
        setFormAuthors(prev => prev.filter(author=> author !== authorToDelete));
    }

    const authorsJSX = formAuthors.map(author => (
        <li key={author}>
            <p>{ author }</p>
            <button data-author={author} onClick={deleteAuthor}>Usuń</button>
        </li>
    ))

    return (
        <Modal shutOnOutsideClick={false} onCloseHandle={hidePopup} isOpen={isPopupOpen}>
            <div className={style()}>
                <form className={style('form')} method="submit" onSubmit={onSubmitHandle}>
                    <div className={style('form-row')}>
                        <label>
                            Autor:
                            <input type="text" className={style('input')} value={formAuthor} onChange={authorChange}/>
                            <button type="button" onClick={addAuthor}>Dodaj autora</button>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Obrazek (url):
                            <input type="text" className={style('input')} value={formImg} onChange={imgChange}/>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Cena:
                            <input type="number" className={style('input')} value={formPrice} onChange={priceChange}/>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Tytuł:
                            <input type="text" className={style('input')} value={formTitle} onChange={titleChange}/>
                        </label>
                    </div>
                    <button type="submit">Zapisz</button>
                    <button onClick={hidePopup}>Anuluj</button>
                </form>
                <p>Lista autorów:</p>
                <ul>
                    { authorsJSX }
                </ul>
            </div>
        </Modal>
    );
}
export default CoursePopup;