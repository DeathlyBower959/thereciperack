import React, { useContext, useState } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { cookbook } from '../../api/api'
import Account from '../../contexts/AccountContext'
import IsCrushed from '../../contexts/IsCrushedContext'
import useForm from '../../hooks/useForm'
import validate from './CreateValidation'

const DivBody = styled.div`
    text-align: center;
    width: 80%;
    padding-bottom: 40px;
    border-radius: 19px;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;
    overflow: hidden;

`

const ErrorMessage = styled.p`
    margin-left: 3px;
    margin-top: 3px;
    color: ${(props) => props.theme.error};
    font-size: 14px;

`

const Input = styled.input`
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
`

const TextArea = styled.textarea`
    width: 60%;
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
    background-color: ${(props) => props.theme.textboxBackground};
`

const CookbookName = styled.h1`
    margin-top: 15px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.foreground};
`

const FormRow = styled(Row)`
    margin-bottom: 10px;
    justify-content: center;
`

const CreateCookbook = () => {
    const Create = () => {}
    const { userData } = useContext(Account)
    const [newData, setNewData] = useState({})
    const { values, errors, handleChange, handleSubmit } = useForm(
        Create,
        validate
    )

    return (
        <DivBody>
            <Container>
                <Form
                    style={{ width: '100%' }}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Row>
                        <CookbookName>
                            {values.name || 'New Cookbook'}
                        </CookbookName>
                    </Row>
                    <FormRow>
                        <Input
                            name='name'
                            onChange={handleChange}
                            value={values.name || ''}
                            placeholder='Name'
                            required
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name}</ErrorMessage>
                        )}
                    </FormRow>
                    <FormRow>
                        <TextArea
                            name='description'
                            onChange={(e) => {
                                handleChange(e)
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
                            }}
                            value={values.description || ''}
                            placeholder='Description'
                            required
                        />
                        {errors.description && (
                            <ErrorMessage>{errors.description}</ErrorMessage>
                        )}
                    </FormRow>
                    {/* <Input
                    type='file'
                    name='coverImage'
                    onChange={handleChange}
                    value={values.coverImage || ''}
                    required
                />
                {errors.coverImage && (
                    <ErrorMessage>{errors.coverImage}</ErrorMessage>
                )} */}
                </Form>
            </Container>
        </DivBody>
    )
}

export default CreateCookbook
