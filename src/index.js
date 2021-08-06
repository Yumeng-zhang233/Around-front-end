import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    //使整个app包裹在BrowserRouter，所以app就可以使用router了
    //A <Router> that uses the HTML5 history API (pushState,
    // replaceState and the popstate event) to keep your UI in sync with the URL.
<BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// 真实入口 If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
