import React from 'react'
import styled from 'styled-components'
import SearchBar from '../Cookbooks/SearchBar'

// Containing div
const DivBody = styled.div`
    width: 90%;
    display: flex;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;

    border-radius: 20px;
`

const Cookbooks = () => {
    
    return (
        <DivBody>
            <SearchBar/>
        </DivBody>
    )
}

export default Cookbooks
