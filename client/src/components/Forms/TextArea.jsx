import React from 'react'
import styled from 'styled-components'

const TextAreaStyled = styled.textarea`
    width: 60%;
    border-radius: 0.5rem;
    resize: none;
    min-height: 42px;
    height: 60px;
    overflow: hidden;
    outline: none;
    color: ${(props) => props.theme.foreground};
    border: 1px solid ${(props) => props.theme.secondaryBackground}08;
    caret-color: ${(props) => props.theme.muted};
    padding: 5px 10px;
    border-bottom: 1.4px solid transparent;
    transition: border 200ms ease;
    font-size: 12px;
    &::placeholder {
        color: ${(props) => props.theme.muted};
    }
    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
    }
    &:focus {
        outline: none;
        border-bottom: 3px solid ${(props) => props.theme.accent};
    }
    background-color: ${(props) => props.theme.inputBackground};
`

const TextArea = (props) => {
    return (
        <TextAreaStyled {...props} onChange={(e) => {
            props.onChange(e)

            // Reset field height
            e.target.style.height = 'inherit'

            // Get the computed styles for the element
            const computed = window.getComputedStyle(
                e.target
            )

            // Calculate the height
            const height =
                parseInt(
                    computed.getPropertyValue(
                        'border-top-width'
                    ),
                    10
                ) +
                parseInt(
                    computed.getPropertyValue(
                        'padding-top'
                    ),
                    10
                ) +
                e.target.scrollHeight +
                parseInt(
                    computed.getPropertyValue(
                        'padding-bottom'
                    ),
                    10
                ) +
                parseInt(
                    computed.getPropertyValue(
                        'border-bottom-width'
                    ),
                    10
                )

            e.target.style.height = `${height}px`
        }}/>
    )
}

export default TextArea
