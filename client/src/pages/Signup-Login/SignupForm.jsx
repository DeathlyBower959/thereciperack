import useForm from '../../hooks/useForm'
import validate from './SignupValidation'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { cookbook, recipe, shopping, users } from '../../api/api'
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

const TextInput = styled(Form.Text)`
    width: 100%;
    margin-bottom: 3px;
    margin-left: 0;
`

const SubmitButton = styled(Form.Button)`
    width: 100%;
`

const ErrorMessage = styled.p`
    margin-left: 3px;
    margin-top: 3px;
    color: ${(props) => props.theme.error};
    font-size: 14px;
`

const SignupForm = () => {
    const navigate = useNavigate()

    const { AuthLogin } = useContext(AccountContext)

    const SignUp = async () => {
        const result = await users.createUser(
            values.name,
            values.email,
            values.password
        )

        if (result?.status == 201) {
            AuthLogin(values.email, values.password)

            navigate('/')
        } else if (result?.status == 403) {
            addError(
                'email',
                'User with this email already exists, maybe login instead?'
            )
        } else {
            console.log(result)
        }
    }

    const { values, errors, handleChange, handleSubmit, addError } = useForm(
        SignUp,
        validate
    )

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit} noValidate>
                <TextInput
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={values.name || ''}
                    placeholder='Name'
                    required
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
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
                <TextInput
                    type='password'
                    name='cPassword'
                    onChange={handleChange}
                    value={values.cPassword || ''}
                    placeholder='Confirm Password'
                    required
                />
                {errors.cPassword && (
                    <ErrorMessage>{errors.cPassword}</ErrorMessage>
                )}
            </FormContainer>
            <SubmitButton style={{ marginTop: '15px' }} onClick={handleSubmit}>
                Sign Up
            </SubmitButton>
            <MutedText style={{ marginTop: '5px', marginBottom: '0' }}>
                Already have an account?
            </MutedText>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <BoldLink style={{ marginBottom: '10px' }}>Login</BoldLink>
            </Link>
        </BoxContainer>
    )
}

export default SignupForm
