import { useEffect, useState } from 'react'
import { Route, Routes as ReactRoutes } from 'react-router-dom'


import { shopping, users, recipe, cookbook } from './api/api'

import styled, { ThemeProvider } from 'styled-components'
import { themes } from './themes.json'

import Routes from './components/Routes/Routes'

import Navbar from './components/Navigation/Navbar'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import SignupLogin from './pages/Signup-Login/Signup-Login'

import useLocalStorage from './hooks/useLocalStorage'
import Landing from './pages/Landing/Landing'

import IsCrushed from './contexts/IsCrushedContext'
import ToastNotifContext from './contexts/ToastNotifContext'
import AccountContext from './contexts/AccountContext'
import About from './pages/About/About'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Account from './pages/Account/Account'

import defaultThemes from './themes.json'

import settings from './settings'
import Cookbooks from './pages/Cookbooks/Cookbooks'
import CreateCookbook from './pages/CreateCookbook/CreateCookbook'

import { IoConstructSharp } from 'react-icons/io5'

const AppContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Background = styled.div`
    background-color: ${(props) => props.theme.background};
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
`

toast.configure()

const App = () => {
    const [localAuth, setLocalAuth] = useLocalStorage('email.password', {
        email: null,
        password: null,
    })

    const AuthLogin = async (email, password) => {
        const LoginPromise = () => {
            return new Promise(async (resolve, reject) => {
                const retrievedUser = await users.getUser(email, password)

                if (!retrievedUser || retrievedUser?.status != 200) {
                    if (userData == 'none') setUserData(null)
                    return reject('User not found')
                }

                setLocalAuth({ email, password })
                setUserData(retrievedUser.data)
                resolve(retrievedUser.data)
            })
        }

        if (email && password) {
            SendToast(
                {
                    promise: LoginPromise,
                    pending: 'Logging you in...',
                    error: 'Failed to login!',
                    success: 'Successfully logged in!',
                },
                'promise'
            )
        } else {
            console.error('No email or password')
            if (userData == 'none') setUserData(null)
        }
    }

    const AuthLogout = () => {
        setUserData(null)
        setLocalAuth({ email: null, password: null })
    }

    const [userData, setUserData] = useState('none')

    const [isCrushed, setIsCrushed] = useState(false)

    const theme =
        (userData?.settings?.themes[
            userData?.settings?.themes.findIndex(
                (theme) => theme.themeID == userData?.settings?.selectedTheme
            )
        ] ||
            userData?.settings?.themes.find(
                (theme) => theme.themeID == 'default_themes.dark'
            )) ??
        defaultThemes.themes[0]

    useEffect(() => {
        if (settings.activeDevelopment)
            SendToast(
                `This app is still in development!`,
                '',
                theme,
                IoConstructSharp
            )

        AuthLogin(localAuth?.email, localAuth?.password)

        const onWindowResize = () => {
            if (window.innerWidth < 768) {
                setIsCrushed(true)
            } else {
                setIsCrushed(false)
            }
        }

        window.removeEventListener('resize', onWindowResize)

        onWindowResize()

        window.addEventListener('resize', onWindowResize.bind(this))
    }, [])

    const SendToast = async (
        message,
        type,
        currentTheme = theme,
        icon = null
    ) => {
        if (!message) return console.error('Failed to send toast, no message!')
        switch (type) {
            case 'success':
                toast.success(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    icon,
                    style: {
                        backgroundColor: currentTheme.secondaryBackground,
                        color: currentTheme.foreground,
                    },
                    progressStyle: {
                        background: `linear-gradient(58deg,${(props) =>
                            props.currentTheme.accent} 20%,${(props) =>
                            props.currentTheme.secondaryAccent} 100%)`,
                    },
                })
                break
            case 'info':
                toast.info(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    icon,
                    style: {
                        backgroundColor: currentTheme.secondaryBackground,
                        color: currentTheme.foreground,
                    },
                    progressStyle: {
                        background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                    },
                })
                break
            case 'warn':
                toast.warn(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    icon,
                    style: {
                        backgroundColor: currentTheme.secondaryBackground,
                        color: currentTheme.foreground,
                    },
                    progressStyle: {
                        background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                    },
                })
                break
            case 'error':
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    icon,
                    style: {
                        backgroundColor: currentTheme.secondaryBackground,
                        color: currentTheme.foreground,
                    },
                    progressStyle: {
                        background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                    },
                })
                break
            case 'promise':
                if (!message.promise)
                    return console.log('Error sending notification!')

                const response = await toast.promise(message.promise, {
                    pending: {
                        render() {
                            return message.pending || 'Working on it...'
                        },
                        position: toast.POSITION.BOTTOM_RIGHT,
                        icon,
                        style: {
                            backgroundColor: currentTheme.secondaryBackground,
                            color: currentTheme.foreground,
                        },
                        progressStyle: {
                            background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                        },
                    },
                    success: {
                        render() {
                            return message.success || 'All done!'
                        },
                        position: toast.POSITION.BOTTOM_RIGHT,
                        icon,
                        style: {
                            backgroundColor: currentTheme.secondaryBackground,
                            color: currentTheme.foreground,
                        },
                        progressStyle: {
                            background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                        },
                    },
                    error: {
                        render() {
                            return (
                                message.error || 'Whoops, this action failed!'
                            )
                        },
                        position: toast.POSITION.BOTTOM_RIGHT,
                        icon,
                        style: {
                            backgroundColor: currentTheme.secondaryBackground,
                            color: currentTheme.foreground,
                        },
                        progressStyle: {
                            background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                        },
                    },
                })

                return response
            default:
                toast(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    icon,
                    style: {
                        backgroundColor: currentTheme.secondaryBackground,
                        color: currentTheme.foreground,
                    },
                    progressStyle: {
                        background: `linear-gradient(58deg,${currentTheme.accent} 20%,${currentTheme.secondaryAccent} 100%)`,
                    },
                })
                break
        }
    }

    return (
        <AppContainer>
            <ToastNotifContext.Provider value={SendToast}>
                <AccountContext.Provider
                    value={{
                        localAuth,
                        setLocalAuth,
                        AuthLogin,
                        AuthLogout,
                        userData,
                        setUserData,
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <IsCrushed.Provider value={isCrushed}>
                            <Background />
                            <Navbar />
                            <ReactRoutes>
                                {/* Page not found */}
                                <Route path='*' element={<PageNotFound />} />

                                {/* Landing Page */}
                                <Route path='/' element={<Landing />} />

                                {/* Extra Routes */}
                                <Route path='/about' element={<About />} />

                                {/* No Account */}
                                <Route element={<Routes.Public />}>
                                    <Route
                                        path='/signup'
                                        element={<SignupLogin login={false} />}
                                    />

                                    <Route
                                        path='/login'
                                        element={<SignupLogin login={true} />}
                                    />
                                </Route>

                                {/* Requires Account/Signed in */}
                                <Route element={<Routes.Private />}>
                                    {/* Manage Account */}
                                    <Route
                                        path='/account'
                                        element={<Account />}
                                    />

                                    {/* //!COOKBOOKS */}
                                    {/* View all cookbooks */}
                                    <Route
                                        path='/cookbooks'
                                        element={<Cookbooks />}
                                    />

                                    {/* Create a new cookbook */}
                                    <Route
                                        path='/cookbook/create'
                                        element={<CreateCookbook />}
                                    />

                                    {/* View all recipes in a cookbook */}
                                    <Route
                                        path='/cookbook/:cookbookID'
                                        exact
                                        element={<PageNotFound />}
                                    />

                                    {/* Edit a cookbook (name, desc, img) */}
                                    <Route
                                        path='/cookbook/:cookbookID/edit'
                                        element={<PageNotFound />}
                                    />

                                    {/* //!RECIPES */}
                                    {/* Create a recipe in a certain cookbook */}
                                    <Route
                                        path='/cookbook/:cookbookID/recipe/create'
                                        element={<PageNotFound />}
                                    />

                                    {/* View recipe */}
                                    <Route
                                        path='/cookbook/:cookbookID/recipe/:recipeID'
                                        exact
                                        element={<PageNotFound />}
                                    />

                                    {/* Edit recipe */}
                                    <Route
                                        path='/cookbooks/:cookbookID/recipe/:recipeID/edit'
                                        element={<PageNotFound />}
                                    />
                                </Route>
                            </ReactRoutes>
                        </IsCrushed.Provider>
                    </ThemeProvider>
                </AccountContext.Provider>
            </ToastNotifContext.Provider>
        </AppContainer>
    )
}

export default App
