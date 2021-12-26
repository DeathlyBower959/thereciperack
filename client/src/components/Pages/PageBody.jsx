import React from 'react'
import styled from 'styled-components'

const DivBody = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;

    border-radius: 20px;
`

const PageBody = ({ children, ...props }) => {
    return <DivBody {...props}>{children}</DivBody>
}

export default PageBody
