import React, {useContext, useState} from 'react';
import bemCssModules from "bem-css-modules";
import LoginFormStyles from './LoginForm.module.scss';
import Modal from "../Modal/Modal";
import {StoreContext} from "../../store/StoreProvider";
import request from "../../helpers/request";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({onCloseModalHandle, isModalOpen}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const loginChangeHandle = e => setLogin(e.target.value);
    const passwordChangeHandle = e => setPassword(e.target.value);
    const submitHandle = async e =>{
        e.preventDefault();
        console.log('SUBMIT');
        const { data, status } = await request.post(
            '/users',
            {
                login,
                password
            }
        );
        if(status === 200){
            setUser(data.user);
            resetStateOfInputs();
            onCloseModalHandle();
        }else{
            setValidateMessage(data.message);
        }
    }
    const cancelHandle = () =>{
        resetStateOfInputs();
        onCloseModalHandle();
    }

    const resetStateOfInputs = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }

    const { setUser } = useContext(StoreContext);


    const validateMessageComponent = validateMessage.length
        ? <p className={style('validate-message')}>{validateMessage}</p>
        : null;

    return (
        <Modal isOpen={isModalOpen} onCloseHandle={onCloseModalHandle}>
            { validateMessageComponent }
            <form className={style()} method="post" onSubmit={submitHandle}>
                <div className={style('row')}>
                    <label>
                        <input type="text" value={login} onChange={loginChangeHandle}/>
                    </label>
                </div>
                <div className={style('row')}>
                    <label>
                        <input type="password" value={password} onChange={passwordChangeHandle}/>
                    </label>
                </div>
                <div className={style('row')}>
                    <button type="submit">Zaloguj</button>
                    <button type="button" onClick={cancelHandle}>Anuluj</button>
                </div>
            </form>
        </Modal>
    );
}
export default LoginForm;