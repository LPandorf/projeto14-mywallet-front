import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../UserContext";

export default function Home(){
    const {userContext}=useContext(UserContext);
    const [transactions,setTransactions] = useState([]);

    useEffect(()=>{
        async function getUserTransaction(){
            try{
                const {data}=await axios.get('',{
                    headers:{
                        Authorization: `Bearer ${userContext.token}`
                    }
                });
                setTransactions(data);
            }catch(error){
                console.error(error.response);
            }
        }
        
        getUserTransaction();
    },[]);

    function renderTransactions(){
        return transactions.map((t,index)=>(
            <Transações key={index} style={t.type==='entrada'? {color:'green'}:{color:'red'}}>
                {t.createAt}|{t.description}|{t.value}
            </Transações>
        ));
    }

    function balance(){
        if(transactions.length>0){
            return transactions.reduce((previous,current)=>{
                if(current.type==='entrada'){
                    return previous+current.value;
                }
                return previous-current.value;
            },0);
        }else{
            return 0;
        }
    }

    const saldo=balance;

    return(
        <Wrapper>
            <Hi>
                Olá, {userContext.name}
                <Link to="/">icone</Link>
            </Hi>
            <Page>
                {transactions.length>0?(
                    <>
                        <p style={{color:'gray', fontSize:12}}>
                            Minhas transações
                            <p>{renderTransactions()}</p>
                        </p>
                        <Total>SALDO: <Num>{saldo}</Num></Total>
                    </>
                ):(
                    <Nothing>Não há registros de<br/>entrada ou saída</Nothing>
                )}
            </Page>
            <End>
                <New>
                    <p>icone</p>
                    <p>Nova<br/>entrada</p>
                </New>
                <New>
                    <p>icone</p>
                    <p>Nova<br/>saída</p>
                </New>
            </End>
        </Wrapper>
    );
}

const Wrapper=styled.div`
    background-color: #8C11BE;
    height: 100vh;
    width: 100vw;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Hi=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

const End=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const New=styled.div`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`;

const Transações=styled.div`

`;

const Page=styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 5px;
`;

const Nothing=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`;

const Total=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
`;

const Num=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #03AC00;
`;