import styled from "styled-components";
import Logo from "./childcomponents/Logo";

export default function Cadastro(){
    return (
        <Wrapper>
            <Logo/>
            cadastro
        </Wrapper>
    );
}

const Wrapper=styled.div`
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