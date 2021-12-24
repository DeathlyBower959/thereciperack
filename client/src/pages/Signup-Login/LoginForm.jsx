import useForm from '../../hooks/useForm'
import validate from './LoginValidation'
import styled from 'styled-components'
import { Link, useNavigate} from 'react-router-dom'
import { users, cookbook, recipe, shopping } from '../../api/api'
import { useContext } from 'react'
import AccountContext from '../../contexts/AccountContext'

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
    color: ${(props) => props.theme.faded};
    font-weight: 500;
    text-decoration: none;
`

const BoldLink = styled.p`
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    margin: 0 4px;
    &:hover {
        color: ${(props) => props.theme.accent};
    }
`

const Input = styled.input`
    width: 100%;
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

const SubmitButton = styled.button`
    width: 100%;
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
`

const ErrorMessage = styled.p`
    margin-left: 3px;
    margin-top: 3px;
    color: ${(props) => props.theme.error};
    font-size: 14px;
`

const LoginForm = () => {
    const navigate = useNavigate();

    const { AuthLogin} = useContext(AccountContext)

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
                <Input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={values.email || ''}
                    placeholder='Email'
                    required
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <Input
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
