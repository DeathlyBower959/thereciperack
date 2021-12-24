import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import styled, { ThemeContext } from 'styled-components'

const StyledModal = styled(Modal)`
    .modal-content {
        background-color: ${props => props.theme.secondaryBackground};
        color: ${props => props.theme.foreground};
    }
`

const TextboxInput = styled.input`
    border-radius: 0.25rem;

    max-width: 500px;
    width: 50%;
    height: 42px;
    outline: none;
    color: ${(props) => props.theme.foreground};
    border: 1px solid ${(props) => props.theme.secondaryBackground}08;
    caret-color: ${(props) => props.theme.muted};
    padding: 0px 10px;
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
    background-color: ${(props) => props.theme.textboxBackground};

    margin-left: 7px;
`

const InputButton = styled.button`
    margin-left: 10px;
    padding: 8px 25px;
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

    &:disabled {
        filter: brightness(0.4);
    }
`

const InputLabel = styled.p`
    color: ${(props) => props.theme.secondaryForeground};
    margin-bottom: 5px;
`

const CreateThemeModal = (props) => {

    const [themeName, setThemeName] = useState('')

    return (
        <StyledModal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            onHide={() => {
                var originalOnHide = props.onHide

                setThemeName('')
                originalOnHide.apply()
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                   New Theme
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputLabel>Theme Name</InputLabel>
                <TextboxInput onChange={(e) => setThemeName(e.target.value)} value={themeName}/>
            </Modal.Body>
            <Modal.Footer>
                <InputButton onClick={() => props.createThemeModalTrue(themeName)}>Create</InputButton>
            </Modal.Footer>
        </StyledModal>
    )
}

export default CreateThemeModal
