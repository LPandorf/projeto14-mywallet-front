import styled from "styled-components"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";

export default function NovaSaida(){
    const [value,setValue]=useState('');
    const [description,setDescription]=useState('');
    const {userContext}=useContext(UserContext);
    const navigate=useNavigate();

    async function OnSubmit(e){
        e.preventDefault();
        const body={
            description,
            type: 'debit',
            value: parseFloat(value)
        };
        const headers={headers:{Authorization: `Bearer ${userContext.token}`}};

        try{
            await axios.post('http://localhost:5000/transactions',body,headers);
            alert("success");
            navigate('/home');
        }catch(error){
            console.log(error);
            alert("erro");
        }
    }
    
    return (
        <Wrapper /* onSubmmit={OnSubmit} */>
            <Title>Nova saída</Title>
            <Input
                placeholder="Valor"
                type="number"
                value={value}
                onChange={e=>setValue(e.target.value)}
            />
            <Input
                placeholder="Descrição"
                type="text"
                value={description}
                onChange={e=>setDescription(e.target.value)}
            />
            <button onClick={OnSubmit} type="submit">
                Salvar saída
            </button>
        </Wrapper>
    );
}

const Wrapper=styled.form`
    width: 100vw;
    height: 100vh;
    background-color:  #8C11BE;
    padding: 25px;
    button{
        background: #A328D6;
        border-radius: 5px;
        width: 100%;
        height: 46px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        margin-top: 20px;
    }
`;

const Title=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 20px;
`;

const Input=styled.input`
    height: 58px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    padding: 20px;
    margin-top: 20px;
`;