import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Account from '../../contexts/AccountContext'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const BoxContainer = styled.div`
    max-width: 280px;
    width: 75%;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;
    overflow: hidden;
`

const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`

const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -290px;
    left: -70px;
    background: ${(props) => props.theme.accent};
    background: linear-gradient(
        0deg,
        ${(props) => props.theme.accent} 20%,
        ${(props) => props.theme.secondaryAccent} 80%
    );
`

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: ${(props) => props.theme.foreground};
    z-index: 10;
    margin: 0;
`

const SmallText = styled.h5`
    color: ${(props) => props.theme.foreground};
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`

const backdropVariants = {
    expanded: {
        width: '233%',
        height: '1050px',
        borderRadius: '20%',
        transform: 'rotate(60deg)',
    },
    collapsed: {
        width: '160%',
        height: '550px',
        borderRadius: '50%',
        transform: 'rotate(60deg)',
    },
}

const expandingTransition = {
    type: 'spring',
    duration: 2.3,
    stiffness: 30,
}

const SignupLogin = ({ login }) => {
    const [isExpanded, setExpanded] = useState(true)

    const [active, setActive] = useState(login ? 'login' : 'signup')

    useEffect(() => {
        playExpandingAnimation(250)
    }, [])

    useEffect(() => {
        playExpandingAnimation()
        setTimeout(() => {
            setActive(login ? 'login' : 'signup')
        }, expandingTransition.duration * 1000 - 1500)
    }, [login])

    const playExpandingAnimation = (time) => {
        setExpanded(true)
        setTimeout(() => {
            setExpanded(false)
        }, time ?? expandingTransition.duration * 1000 - 1500)
    }

    const switchToSignup = () => {
        playExpandingAnimation()
        setTimeout(() => {
            setActive('signup')
        }, 400)
    }

    const switchToSignin = () => {
        playExpandingAnimation()
        setTimeout(() => {
            setActive('login')
        }, 400)
    }

    return (
            <BoxContainer>
                <TopContainer>
                    <BackDrop
                        initial={false}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === 'login' && (
                        <HeaderContainer>
                            <HeaderText>Welcome</HeaderText>
                            <HeaderText>Back!</HeaderText>
                            <SmallText>Please login to continue!</SmallText>
                        </HeaderContainer>
                    )}
                    {active === 'signup' && (
                        <HeaderContainer>
                            <HeaderText>Create</HeaderText>
                            <HeaderText>Account</HeaderText>
                            <SmallText>Please sign-up to continue!</SmallText>
                        </HeaderContainer>
                    )}
                </TopContainer>
                <InnerContainer>
                    {active === 'login' && <LoginForm />}
                    {active === 'signup' && <SignupForm />}
                </InnerContainer>
            </BoxContainer>
    )
}

export default SignupLogin
