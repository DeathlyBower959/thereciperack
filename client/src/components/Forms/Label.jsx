import React from 'react'
import styled from 'styled-components'

const TextLabel = styled.p`
    color: ${(props) => props.theme.secondaryForeground};
    margin-top: 15px;
    margin-bottom: 5px;
`

const Label = (props) => {
    return (
        <TextLabel {...props}/>
    )
}

export default Label
