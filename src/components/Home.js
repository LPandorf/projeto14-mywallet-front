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
                const {data}=await axios.get('http://localhost:5000/transactions',{
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


    function Console(){
        console.log("pshfjbgkjbfgkjbf")
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

    const saldo=balance();

    return(
        <Wrapper>
            <Hi>
                Olá, {userContext.name}
                <Link to="/"><Icon><ion-icon name="log-out-outline"></ion-icon></Icon></Link>
            </Hi>
            <Page>
                {transactions.length>0?(
                    <>
                        {/* <p style={{color:'gray', fontSize:12}}>
                            Minhas transações
                            
                        </p> */}
                        {transactions.map((t,index)=>(
                            
                            <Transações key={index} >
                                <Left>
                                    <Date>{t.createAt}  </Date>
                                    <Desc>{t.description}</Desc>
                                </Left>
                                <Val style={t.type==='entrada'? {color:'green'}:{color:'red'}}>{t.value}{Console()}</Val>
                            </Transações>
                        ))}
                        <Total>SALDO: <Num style={saldo>=0? {color:'green'}:{color:'red'}}>{saldo}</Num></Total>
                    </>
                ):(
                    <Nothing>Não há registros de<br/>entrada ou saída</Nothing>
                )}
            </Page>
            <End>
                <Link to="/entrada">
                    <New>
                        <Icon><ion-icon name="add-circle-outline"></ion-icon></Icon>
                        <p>Nova<br/>entrada</p>
                    </New>
                </Link>
                <Link to="/saida">
                    <New>
                        <Icon><ion-icon name="remove-circle-outline"></ion-icon></Icon>
                        <p>Nova<br/>saída</p>
                    </New>
                </Link>
            </End>
        </Wrapper>
    );
}
/* <p>{renderTransactions()}</p> */
const Wrapper=styled.div`
    background-color: #8C11BE;
    height: 100vh;
    width: 100vw;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon=styled.div`
    font-size: 30px;
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
    align-items: flex-start;
    padding: 10px;
`;

const Transações=styled.div`
    color: black;
    width: 100%;
    height: 95%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 10px;
`;

const Page=styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 20px;
    justify-content: space-between;
`;

const Nothing=styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const Num=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
`;

const Date=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
    margin-right: 10px;
`;

const Desc=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;

const Val=styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
`;

const Left=styled.div`
    display: flex;
    justify-content: flex-start;
`;


   /*  function renderTransactions(){
        console.log("knkdbfjdsbjsdbflbdlbfdsb")
        return transactions.map((t,index)=>(
            
            <Transações key={index} style={t.type==='entrada'? {color:'green'}:{color:'red'}}>
                {t.createAt}|{t.description}|{t.value}{Console()}
            </Transações>
        )); 
    } */