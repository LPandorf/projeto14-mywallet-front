import { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import {User} from "./UserContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";

export default function App(){
    const [userContext, setUserContext] =useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null);
    
    return(
        <>
            <GlobalStyle/>
            <User.Provider value={{userContext,setUserContext}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                    </Routes>
                </BrowserRouter>
            </User.Provider>
        </>
    );
}