import styled from "styled-components";
import Logo from "./childcomponents/Logo";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RenderButton from "./childcomponents/RenderButton";

export default function Cadastro(){
    const [userContext,setUserContext]=useState({
        email: "", 
        password: "",
        name: "",
    });
    const {email,password,name}=userContext;
    const [desabilitado,setDesabilitado]=useState(false);
    const navigate=useNavigate();
    const [passwordConfirmation,setPasswordConfirmation]=useState([]);



    function OnSubmit(e){
        setDesabilitado(true);
        e.preventDefault();
        if(passwordConfirmation!==password){
            alert("Confirmação de senha e senha devem ser iguais");
            return;
        }
        const promisse=axios.post("http://localhost:5000/cadastro",{
            email:email,
            name:name,
            password:password
        });
        promisse.then(()=>{navigate('/')});
        promisse.catch((warning)=>{
            alert("Erro! Tente novamente.");
            setDesabilitado(false);
        });
    }

    return (
        <Wrapper onSubmit={OnSubmit}>
            <Logo/>
            <Margin/>
            <Input
                placeholder="Nome"
                type="name"
                value={name}
                onChange={(e)=>setUserContext({...userContext,name: e.target.value})}
                disabled={desabilitado}
                required
            />
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e)=>setUserContext({...userContext,email:e.target.value})}
                disabled={desabilitado}
                required
            />
            <Input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e)=>setUserContext({...userContext,password: e.target.value})}
                disabled={desabilitado}
                required
            />
            <Input
                placeholder="Confirme sua senha"
                type="password"
                value={passwordConfirmation}
                onChange={e=>setPasswordConfirmation(e.target.value)}
                disabled={desabilitado}
                required
            />
            <button
                type="submit"
                disabled={desabilitado}
            >
                <RenderButton state={desabilitado} text="Cadastrar" />
            </button>
            <Link to={`/`}>
                <Logar>Já tem uma conta? Entre agora!</Logar>
            </Link>
        </Wrapper>
    );
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
        height: 50px;
        padding: 10px;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
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

const Logar=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 50px;
`;