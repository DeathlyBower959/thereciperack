import useForm from '../../hooks/useForm'
import validate from './LoginValidation'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { users, cookbook, recipe, shopping } from '../../api/api'
import { useContext } from 'react'
import AccountContext from '../../contexts/AccountContext'
import Form from '../../components/Forms/Form'

const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`

const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const MutedText = styled.p`
    font-size: 11px;
    color: ${(props) => props.theme.muted};
    font-weight: 500;
    text-decoration: none;
`

const BoldLink = styled.p`
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    margin: 0 4px;
    transition: filter 250ms ease-in-out;
`

const SubmitButton = styled(Form.Button)`
    width: 100%;
`

const TextInput = styled(Form.Text)`
    width: 100%;
    margin-bottom: 3px;
    margin-left: 0;
`

const ErrorMessage = styled.p`
    margin-left: 3px;
    margin-top: 3px;
    color: ${(props) => props.theme.error};
    font-size: 14px;
`

const LoginForm = () => {
    const navigate = useNavigate()

    const { AuthLogin } = useContext(AccountContext)

    const Login = () => {
        AuthLogin(values.email, values.password)

        navigate('/')
    }

    const { values, errors, handleChange, handleSubmit } = useForm(
        Login,
        validate
    )

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit} noValidate>
                <TextInput
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={values.email || ''}
                    placeholder='Email'
                    required
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <TextInput
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={values.password || ''}
                    placeholder='Password'
                    required
                />
                {errors.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                )}
            </FormContainer>
            <Link to='/resetpassword' style={{ textDecoration: 'none' }}>
                <BoldLink style={{ margin: '5px auto 15px auto' }}>
                    Forgot your password?
                </BoldLink>
            </Link>
            <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
            <MutedText style={{ margin: '10px auto 0 auto' }} href='#'>
                Don't have an account?
            </MutedText>
            <Link to='/signup' style={{ textDecoration: 'none' }}>
                <BoldLink style={{ marginBottom: '10px' }}>Create one</BoldLink>
            </Link>
        </BoxContainer>
    )
}

export default LoginForm
