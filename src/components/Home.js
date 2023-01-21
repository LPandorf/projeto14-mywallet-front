import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import userContext from "../UserContext";

export default function Home(){
    const {user}=useContext(userContext);
    const [transactions,setTransactions] = useState([]);

    useEffect(()=>{
        async function getUserTransaction(){
            try{
                const {data}=await axios.get('',{
                    headers:{
                        Authorization: `Bearer ${user.token}`
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
        
    )
}