import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import styled, { ThemeContext } from 'styled-components'
import Form from '../../components/Forms/Form'

const StyledModal = styled(Modal)`
    .modal-content {
        background-color: ${props => props.theme.secondaryBackground};
        color: ${props => props.theme.foreground};
    }
`

const CreateThemeModal = (props) => {

    const [themeName, setThemeName] = useState('')

    return (
        <StyledModal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            onHide={(e) => {
                setThemeName('')
                props.onHide(e)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                   New Theme
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Theme Name</Form.Label>
                <Form.Text onChange={(e) => setThemeName(e.target.value)} value={themeName}/>
            </Modal.Body>
            <Modal.Footer>
                <Form.Button onClick={() => props.createthememodaltrue(themeName)}>Create</Form.Button>
            </Modal.Footer>
        </StyledModal>
    )
}

export default CreateThemeModal
