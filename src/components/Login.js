import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import Logo from "./childcomponents/Logo";
import { Link, Navigate } from "react-router-dom";
import RenderButton from "./childcomponents/RenderButton";


export default function Login(){
    const [userContext,setUserContext] =useState({
        email: "", 
        password: "",
    });
    const {email, password} = userContext;
    const [desabilitado,setDesabilitado]=useState(false);
    const [next,setNext] = useState(false);

    function OnSubmit(e){
        e.preventDefault();
        setDesabilitado(true);
        const body = {email, password};
        const promisse=axios.post("http://localhost:5000/",body);
        promisse.then((answer)=>{
             localStorage.setItem("user", JSON.stringify({
                token: answer.data.token,
                name: answer.data.name,
            }));  
            setNext(true);
        });
        promisse.catch(error=>{
            alert("Erro! Tente novamente.",error);
            setDesabilitado(false);
        });
    }

    if(next){
        return <Navigate to={"/home"}/>
    }else{
        return (
            <Wrapper onSubmit={OnSubmit}>
                <Logo/>
                <Margin/>
                <Input
                    placeholder="E-mail"
                    required
                    value={email}
                    type="email"
                    onChange={(e)=>setUserContext({...userContext,email:e.target.value})}
                    disabled={desabilitado}
                />
                <Input
                    placeholder="Senha"
                    required
                    value={password}
                    type="password"
                    onChange={(e)=>setUserContext({...userContext,password: e.target.value})}
                    disabled={desabilitado}
                />
                <button 
                    type="submit"
                    disabled={desabilitado}
                >
                    <RenderButton state={desabilitado} text="Entrar"/>
                </button>
                <Link to={`/cadastro`}>
                    <Cadastrar>Primeira vez? Cadastre-se!</Cadastrar>
                </Link>
            </Wrapper>
        );
    }
}

const Wrapper=styled.form`
    height: 100vh;
    width: 100vw;
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button{
        color: white;
        background-color: #A328D6;
        width: 326px;
        height: 46px;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
    }
`;

const Input=styled.input`
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    margin-bottom: 15px;
    padding: 20px;
`;

const Margin=styled.div`
    margin-top: 40px;
`;

const Cadastrar=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 50px;
`;