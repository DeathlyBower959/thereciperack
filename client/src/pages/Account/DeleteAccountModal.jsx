import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import styled, { ThemeContext } from 'styled-components'
import Form from '../../components/Forms/Form'

const StyledModal = styled(Modal)`
    .modal-content {
        background-color: ${(props) => props.theme.secondaryBackground};
        color: ${(props) => props.theme.foreground};
    }
`

const Description = styled.p`
    color: white;
`

const CreateThemeModal = (props) => {
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <StyledModal
            {...props}
            size='lg'
            restoreFocus
            aria-labelledby='contained-modal-title-vcenter'
            centered
            backdrop="static"
            keyboard={false}
            onHide={(e) => {
                setConfirmPassword('')
                props.onHide(e)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Confirm Account Deletion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Description>
                    Deleting your account will mean all of your recipes,
                    cookbooks, and account data will be removed.
                </Description>
                <Description>
                    If you are sure you want to delete your account, please confirm your
                    password.
                </Description>
                <Form.Label>Password</Form.Label>
                <Form.Text
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
            </Modal.Body>
            <Modal.Footer>
                <Form.Button
                    disabled={confirmPassword != props.password}
                    onClick={props.deleteAccountModalTrue}
                >
                    Delete Account
                </Form.Button>
            </Modal.Footer>
        </StyledModal>
    )
}

export default CreateThemeModal
