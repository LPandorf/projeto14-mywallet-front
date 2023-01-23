import { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import {UserContext} from "./UserContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";

export default function App(){
    const [userContext, setUserContext]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null);
    
    return(
        <>
            <GlobalStyle/>
            <UserContext.Provider value={{userContext,setUserContext}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}
//Login