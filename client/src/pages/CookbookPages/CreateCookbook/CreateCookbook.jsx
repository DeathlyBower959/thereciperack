import React, { useContext, useRef } from 'react'
import { Form as FormWrapper, Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { cookbook } from '../../../api/api'
import Account from '../../../contexts/AccountContext'
import IsCrushed from '../../../contexts/IsCrushedContext'
import ToastNotif from '../../../contexts/ToastNotifContext'
import useForm from '../../../hooks/useForm'
import validate from './CreateValidation'
import { useNavigate } from 'react-router'
import { byteSize } from '../../../utils/image'
import Pages from '../../../components/Pages/Pages'
import Form from '../../../components/Forms/Form'

const DivBody = styled(Pages.PageBody)`
    text-align: center;
    padding-bottom: 40px;
`

const ErrorMessage = styled.p`
    margin-left: 3px;
    margin-top: 3px;
    color: ${(props) => props.theme.error};
    font-size: 14px;
`

const TextArea = styled.textarea`
    width: 60%;
    border-radius: 8px;
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
    const Create = async () => {
        const res = await cookbook.createCookbook(userData.id, {
            ...values,
            tags: values?.tags?.split(',')?.map((item) => item?.trim()) || [],
        })
        if (res.status != 201) Toast('Failed to create cookbook...', 'error')
        else {
            setUserData(res.data)
            Toast('Created cookbook!', 'success')
            navigate(-1)
        }
    }

    const navigate = useNavigate()

    const Toast = useContext(ToastNotif)
    const isCrushed = useContext(IsCrushed)
    const { userData, setUserData } = useContext(Account)

    const coverImageRef = useRef()

    const {
        values,
        errors,
        handleChange,
        setErrors,
        setValues,
        setIsSubmitting,
        handleSubmit,
    } = useForm(
        Create,
        validate,
        {},
        {
            handleChange: (e) => {
                if (e?.persist) e.persist()

                if (e.target.name == 'coverImage') {
                    if (
                        !['.png', '.jpg', '.jpeg', '.bmp', '.ico'].some((ex) =>
                            e.target.files[0]?.name?.toLowerCase()?.endsWith(ex)
                        )
                    ) {
                        e.target.value = ''
                        setValues((values) => ({
                            ...values,
                            [e.target.name]: null,
                        }))
                        return
                    }

                    let reader = new FileReader()
                    reader.onload = (e) => {
                        // Files bigger than 10mb will show a warning
                        if (byteSize(e.target.result, 'mb') >= 10) {
                            Toast('File to large!', 'warn')
                            e.target.value = ''
                            return
                        }
                        setValues((values) => ({
                            ...values,
                            coverImage: e.target.result,
                        }))
                    }
                    reader.readAsDataURL(e.target.files[0])
                    return
                }

                setErrors((prev) => {
                    return { ...prev, [e.target.name]: null }
                })

                setValues((values) => ({
                    ...values,
                    [e.target.name]: e.target.value,
                }))
            },
        }
    )

    return (
        <DivBody>
            <FormWrapper
                style={{ width: '100%' }}
                onSubmit={handleSubmit}
                noValidate
            >
                <Container>
                    <Row>
                        <CookbookName>
                            {values.name || 'New Cookbook'}
                        </CookbookName>
                    </Row>
                    <FormRow>
                        <Form.Text
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
                        <Form.TextArea
                            name='description'
                            onChange={handleChange}
                            value={values.description || ''}
                            placeholder='Description'
                            required
                        />
                        {errors.description && (
                            <ErrorMessage>{errors.description}</ErrorMessage>
                        )}
                    </FormRow>
                    <FormRow
                        style={{
                            width: isCrushed ? '60%' : '50%',
                            margin: '0 auto',
                        }}
                    >
                        <Col>
                            <Form.File
                                inputRef={coverImageRef}
                                label='Cover Image'
                                name='coverImage'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.coverImage && (
                                <ErrorMessage>{errors.coverImage}</ErrorMessage>
                            )}
                        </Col>

                        {!isCrushed && (
                            <Col>
                                <Form.Text
                                    style={{ width: '100%' }}
                                    name='tags'
                                    onChange={handleChange}
                                    value={values.tags || ''}
                                    placeholder='Tags (separated by ",")'
                                />
                                {errors.tags && (
                                    <ErrorMessage>{errors.tags}</ErrorMessage>
                                )}
                            </Col>
                        )}
                    </FormRow>
                    {isCrushed && (
                        <FormRow style={{ marginTop: '10px' }}>
                            <Form.Text
                                style={{ width: '60%' }}
                                name='tags'
                                onChange={handleChange}
                                value={values.tags || ''}
                                placeholder='Tags (separated by ",")'
                            />
                            {errors.tags && (
                                <ErrorMessage>{errors.tags}</ErrorMessage>
                            )}
                        </FormRow>
                    )}
                    <br />
                    <Form.Button>Create</Form.Button>
                    <Form.Button
                        type='button'
                        muted
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Form.Button>
                </Container>
            </FormWrapper>
        </DivBody>
    )
}

export default CreateCookbook
