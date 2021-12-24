import React from 'react'
import styled from 'styled-components'
import ripped from '../../assets/ripped.png'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const DivBody = styled.div`
    text-align: center;
    width: 70%;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;
    overflow: hidden;
`

const Header404 = styled.h2`
    padding: 40px 0px 0px 0px;
    color: ${(props) => props.theme.secondaryForeground};
    font-weight: bold;
`

const Desc = styled.h1`
    padding: 0px 10px;
    color: ${(props) => props.theme.foreground};
    font-weight: bold;
`

const GoBack = styled.button`
    width: 100px;
    padding: 10px 10px;
    margin: 20px auto 0px auto;
    color: ${(props) => props.theme.foreground};
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: filter 240ms ease-in-out;
    background: ${(props) => props.theme.accent};
    background: linear-gradient(
        58deg,
        ${(props) => props.theme.accent} 20%,
        ${(props) => props.theme.secondaryAccent} 100%
    );
    &:hover {
        filter: brightness(0.9);
    }
`

const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <DivBody style={{ userSelect: 'none' }}>
            <Header404>404 Error</Header404>
            <Desc>Sorry, we can't seem to find what you're looking for.</Desc>
            <img draggable={false} src={ripped} width='100%' />
            <GoBack onClick={() => navigate(-1)}>Go Back</GoBack>
        </DivBody>
    )
}

export default PageNotFound
