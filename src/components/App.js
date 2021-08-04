import React,{useState} from 'react';
import TopBar from './TopBar';
import Main from "./Main";

import {TOKEN_KEY} from "../constants";
//react 组件入口，负责把所有components收集到app下面
function App() {
    //state: isLoggedIn
    //setState: setIsLoggedIn
    console.log(useState(0));
    //检查是否拿到key，有key 表示已登陆，true 没key表示没登录，false
    const[isLoggedIn,setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY)? true:false

    );

    const logout = () => {
        console.log("log out");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    };

    const loggedIn = (token) => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }
    };
    return (
    <div className="App">
     <TopBar isLoggedIn={isLoggedIn}
             handleLogout={logout}/>
        <Main />
    </div>
  );
}

export default App;
