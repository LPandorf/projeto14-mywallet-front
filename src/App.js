import { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import {UserContext} from "./UserContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import NovaEntrada from "./components/NovaEntrada";
import NovaSaida from "./components/NovaSaida";

export default function App(){
    const [userContext, setUserContext]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null);
    
    return(
        <>
            <GlobalStyle/>
            <UserContext.Provider value={{userContext,setUserContext}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/entrada" element={<NovaEntrada/>}/>
                        <Route path="/saida" element={<NovaSaida/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}