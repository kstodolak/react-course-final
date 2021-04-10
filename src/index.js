import React from "react";
import ReactDOM from "react-dom"
import App from "./App";
import './styles/main.scss';

const root = document.getElementById('root');

if(root){
    ReactDOM.render(
        <App/>,
        root
    );
}