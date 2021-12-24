import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { users } from '../../api/api'
import AccountContext from '../../contexts/AccountContext'
import ToastNotif from '../../contexts/ToastNotifContext'

import Checkbox from '../../components/Forms/Checkbox'
import { Spinner } from 'react-bootstrap'

import { SketchPicker } from 'react-color'
import CreateThemeModal from './CreateThemeModal'
import DeleteAccountModal from './DeleteAccountModal'
import { sendEmail } from '../../api/email'
import { createTheme, deleteTheme } from '../../api/settings'

// Containing div
const DivBody = styled.div`
    width: 90%;
    display: flex;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;

    border-radius: 20px;
`

// Holds navigation for settings
const Sidebar = styled.div`
    border-radius: 20px;
    background-color: ${(props) => props.theme.textboxBackground};
`

// Button for sidebar
const SidebarButton = styled.button`
    width: 100%;
    display: block;
    border: 0;
    outline: 0;

    background-color: ${(props) => props.theme.textboxBackground};

    transition: filter 240ms ease-in-out;

    &:hover {
        filter: brightness(0.9);
    }

    color: ${(props) => props.theme.secondaryForeground};
    text-align: left;
    padding: 10px 10px 10px 17px;
    margin-right: 30px;
`

// Wraps navigation items, and makes them move down once top of the screen is hit.
const StickyItems = styled.div`
    position: sticky;
    top: 100px;
`

// Navigation Header
const Header = styled.h4`
    color: ${(props) => props.theme.foreground};
    margin: 15px 20px 15px 15px;
`

// Holds all <Section> element
const Sections = styled.div`
    margin-left: 20px;
    width: 100%;
`

// Setting section
const Section = styled.div`
    margin-top: 20px;
`

// Setting section title
const SectionTitle = styled.h5`
    color: ${(props) => props.theme.foreground};
`

// Input field of type text
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

// Label above input
const InputLabel = styled.p`
    color: ${(props) => props.theme.secondaryForeground};
    margin-top: 15px;
    margin-bottom: 5px;
`

// Input Button Update
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
        cursor: auto;
        filter: brightness(0.4);
    }
`

// Group for an input area
const InputGroup = styled.div`
    margin-left: 8px;
    margin-bottom: 10px;
`

// Paragraph that is added when error is shown
const ErrorMessage = styled.p`
    margin-left: 3px;
    margin-top: 3px;
    color: ${(props) => props.theme.error};
    font-size: 14px;
`

// Shown in place when data is loading
const StyledSpinner = styled(Spinner)`
    border-color: ${(props) => props.theme.accent};
    border-right-color: transparent;
`

// Select Dropdown to choose theme
const ThemeChooser = styled.select`
    display: block;
    max-width: 500px;
    width: 50%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(props) => props.theme.foreground};
    background-color: ${(props) => props.theme.textboxBackground};
    appearance: none;
    border-radius: 0.25rem;

    ::placeholder {
        color: ${(props) => props.theme.muted};
    }

    border-width: 0;
    outline: 0;
    margin-left: 7px;
`

// Color picker
const StyledSketchPicker = styled(SketchPicker)`
    background: transparent !important;
    margin-top: 10px;
    margin-left: 10px;

    input {
        background-color: ${(props) => props.theme.textboxBackground};
        color: ${(props) => props.theme.secondaryForeground} !important;
    }

    label {
        color: ${(props) => props.theme.secondaryForeground} !important;
    }

    input:focus-visible {
        outline: 0 !important;
    }
`

// Buttons to display color pickers
const AppearanceColorTitle = styled.button`
    color: ${(props) => props.theme.secondaryForeground};
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: filter 240ms ease-in-out;
    background: transparent;
    background: transparent;
    &:hover {
        filter: brightness(0.9);
    }

    &:disabled {
        cursor: auto;
        filter: brightness(0.4);
    }
`

const ShownOnHover = styled.span`
    filter: blur(3px);
    transition: filter 250ms;
    cursor: pointer;
    user-select: none;

    &:hover {
        filter: none;
    }
`

// Scroll to any element, with an offset of x pixels
const scrollTo = (id) => {
    var element = document.getElementById(id)

    let pos = element.style.position
    let top = element.style.top

    element.style.position = 'relative'
    element.style.top = '-75px'

    element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    })

    element.style.top = top
    element.style.position = pos
}

const Account = () => {
    const theme = useContext(ThemeContext)
    const { setLocalAuth, userData, setUserData, AuthLogout } =
        useContext(AccountContext)
    const Toast = useContext(ToastNotif)

    const [errors, setErrors] = useState({})
    const [NewData, setNewData] = useState({ ...userData, password: null })

    const [modalShow, setModalShow] = useState({
        createTheme: false,
        deleteAccount: false,
    })
    const [visibleAppearance, setVisibleAppearance] = useState('')

    // Updating state on inputs
    const handleChange = (e) => {
        setNewData((prev) => {
            setErrors((prev) => {
                return { ...prev, [e.target.name]: null }
            })
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    // Update item in database
    const updateItem = async (e) => {
        let newErr = {}
        if (e.target.name == 'name') {
            if (!NewData.name) newErr.name = 'Your name is required'
            else if (NewData.name?.toString().trim() == '')
                newErr.name = 'Your name is required'
            else if (NewData.name?.length < 5)
                newErr.name = 'Too short, must be at least 5 characters long'
            else {
                const res = await users.editUser(userData.id, NewData)
                if (res.status != 201)
                    Toast('Failed to update name...', 'error')
                else {
                    setUserData(res.data)
                    Toast('Name updated!', 'success')
                }
            }
        }

        if (e.target.name == 'email') {
            if (!NewData.email) newErr.email = 'Your email is required'
            else if (NewData.email?.toString().trim() == '')
                newErr.email = 'Your email is required'
            else if (!/\S+@\S+\.\S+/.test(NewData.email))
                newErr.email = 'Email address is invalid'
            else {
                const res = await users.editUser(userData.id, NewData)
                if (res.status != 201)
                    Toast('Failed to update email...', 'error')
                else {
                    setUserData(res.data)
                    setLocalAuth({
                        email: res.data.email,
                        password: res.data.password,
                    })

                    Toast('Email updated!', 'success')
                }
            }
        }

        if (e.target.name == 'password') {
            if (!NewData.password)
                newErr.password = 'Your previous password is required'
            else if (NewData.password.toString().trim() == '')
                newErr.password = 'Your previous password is required'
            else if (NewData.password?.length < 8)
                newErr.password = 'Password must be 8 or more characters'
        }

        if (e.target.name == 'newPassword') {
            if (!NewData.newPassword)
                newErr.newPassword = 'You have to specify a new password'
            else if (NewData.password.toString().trim() == '')
                newErr.newPassword = 'You have to specify a new password'
            else if (NewData.newPassword?.length < 8)
                newErr.newPassword = 'Password must be 8 or more characters'
            else if (NewData.newPassword == userData.password)
                newErr.newPassword = 'Password must be different'
            else {
                const res = await users.editUser(userData.id, {
                    ...NewData,
                    password: NewData.newPassword,
                })
                if (res.status != 201)
                    Toast('Failed to update password...', 'error')
                else {
                    setUserData(res.data)
                    setNewData((prev) => {
                        return { ...prev, password: null, newPassword: null }
                    })
                    setLocalAuth({
                        email: res.data.email,
                        password: res.data.password,
                    })
                    Toast(
                        'Password updated! Make sure to remember it!',
                        'success'
                    )
                }
            }
        }
        setErrors(newErr)
    }

    const updateSetting = async (e) => {
        if (e.target.name == 'seePublicRecipes') {
            const res = await users.editUser(userData.id, {
                ...NewData,
                settings: {
                    ...NewData.settings,
                    [e.target.name]: e.target.checked,
                },
            })

            if (res.status != 201)
                Toast('Failed to update recipe visibility...', 'error')
            else {
                setUserData(res.data)
                if (res.data.settings.seePublicRecipes)
                    Toast('You can now see public recipes!', 'success')
                else Toast("You can't see public recipes anymore!", 'success')
            }
        }

        if (e.target.name == 'sharePublicRecipes') {
            const res = await users.editUser(userData.id, {
                ...NewData,
                settings: {
                    ...NewData.settings,
                    [e.target.name]: e.target.checked,
                },
            })

            if (res.status != 201)
                Toast('Failed to update recipe visibility...', 'error')
            else {
                setUserData(res.data)
                if (res.data.settings.seePublicRecipes)
                    Toast('Your public recipes are now visible!', 'success')
                else Toast('Your public recipes are now hidden!', 'success')
            }
        }

        if (e.target.name == 'selectedTheme') {
            const res = await users.editUser(userData.id, {
                ...NewData,
                settings: {
                    ...NewData.settings,
                    [e.target.name]: e.target.value,
                },
            })

            if (res.status != 201) {
                Toast('Failed to change theme...', 'error')
                console.log(res.data)
            } else {
                setUserData(res.data)
                setVisibleAppearance('')
                Toast(
                    'Your theme was changed!',
                    'success',
                    res.data.settings.themes.find(
                        (x) => x.themeID == e.target.value
                    )
                )
            }
        }

        if (e.target.name == 'deleteTheme') {
            const res = await deleteTheme(
                userData.id,
                userData.settings.selectedTheme
            )

            if (res.status != 200)
                return Toast('Failed to delete theme', 'error')

            const res2 = await users.editUser(userData.id, {
                ...res.data,
                settings: {
                    ...res.data.settings,
                    selectedTheme: 'default_themes.dark',
                },
            })

            if (res2.status != 201) {
                Toast('Failed to change theme...', 'error')
            } else {
                setUserData(res2.data)
                Toast(
                    'Theme deleted!',
                    'success',
                    res.data.settings.themes.find(
                        (x) => x.themeID == res.data.settings.selectedTheme
                    )
                )
                setVisibleAppearance('')
            }
        }
    }

    // Used as when data is saved to database, it sets password to null
    useEffect(() => {
        setNewData({ ...userData, password: null })
    }, [userData])

    return (
        <>
            <CreateThemeModal
                show={modalShow.createTheme}
                onHide={() =>
                    setModalShow((prev) => {
                        return { ...prev, createTheme: false }
                    })
                }
                createThemeModalTrue={async (name) => {
                    setModalShow((prev) => {
                        return { ...prev, createTheme: false }
                    })

                    const res = await createTheme(userData.id, {
                        name,
                        themeID: 'user_themes.' + name.trim().toLowerCase(),
                    })

                    if (res.status != 201)
                        return Toast('Failed to create theme', 'error')

                    setUserData(res.data)
                }}
            />

            <DeleteAccountModal
                show={modalShow.deleteAccount}
                password={userData.password}
                onHide={() =>
                    setModalShow((prev) => {
                        return { ...prev, deleteAccount: false }
                    })
                }
                deleteAccountModalTrue={async () => {
                    setModalShow((prev) => {
                        return { ...prev, deleteAccount: false }
                    })

                    const id = userData.id
                    setLocalAuth({ email: null, password: null })
                    AuthLogout()
                    Toast('Account Deleted!', 'warn ')
                    users.deleteUser(id)
                }}
            />
            <DivBody>
                <Sidebar>
                    <StickyItems>
                        <Header>Settings</Header>
                        <SidebarButton
                            onClick={() => scrollTo('account-account')}
                        >
                            Account
                        </SidebarButton>

                        <SidebarButton
                            onClick={() => scrollTo('account-privacy')}
                        >
                            Privacy
                        </SidebarButton>

                        <SidebarButton
                            onClick={() => scrollTo('account-appearance')}
                        >
                            Appearance
                        </SidebarButton>

                        <SidebarButton
                            onClick={() => scrollTo('account-adv.settings')}
                        >
                            Advanced settings
                        </SidebarButton>
                    </StickyItems>
                </Sidebar>
                <Sections>
                    <Section id='account-account'>
                        <SectionTitle>Account</SectionTitle>
                        {NewData?.id == null && (
                            <StyledSpinner animation='border' />
                        )}

                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <InputLabel>Name</InputLabel>
                            <TextboxInput
                                onChange={handleChange}
                                name='name'
                                value={NewData?.name ?? ''}
                            />
                            <InputButton
                                disabled={
                                    userData?.name?.trim() ==
                                    NewData.name?.trim()
                                }
                                name='name'
                                onClick={updateItem}
                            >
                                Update
                            </InputButton>

                            {errors.name && (
                                <ErrorMessage>{errors.name}</ErrorMessage>
                            )}
                        </InputGroup>

                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <InputLabel>Email</InputLabel>
                            <TextboxInput
                                onChange={handleChange}
                                name='email'
                                value={NewData?.email ?? ''}
                            />
                            <InputButton
                                disabled={
                                    userData?.email?.trim() ==
                                    NewData?.email?.trim()
                                }
                                name='email'
                                onClick={updateItem}
                            >
                                Update
                            </InputButton>

                            {errors.email ? (
                                <ErrorMessage>{errors.email}</ErrorMessage>
                            ) : (
                                userData?.email?.trim() ==
                                    NewData?.email?.trim() &&
                                userData.token != null && (
                                    <p
                                        style={{
                                            margin: '3px auto auto 12px',
                                            color: theme.secondaryForeground,
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            sendEmail(
                                                userData.email,
                                                'Verification Email',
                                                `
                                                <!DOCTYPE html>
                                                <html lang="en">
                                                <head>
                                                        <meta charset="UTF-8" />
                                                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                                        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                                                        <title>Static Template</title>
                                                        <link
                                                        href="https://fonts.googleapis.com/css?family=Muli&amp;display=swap"
                                                        rel="stylesheet"
                                                        />
                                                    </head>
                                                    <body>
                                                    <div
                                                        style="
                                                            margin: auto;
                                                            width: 400px;
                                                            background-color: #f6f6f6;
                                                            padding: 10px;
                                                            font-family: 'Muli', sans-serif;
                                                        "
                                                        >
                                                        <div
                                                            style="
                                                            margin: 15px;
                                                            padding: 10px;
                                                            background-color: #fff;
                                                            text-align: center;
                                                            "
                                                        >
                                                            <h2>Thanks for signing up,<br />${userData.name}!</h2>
                                                    
                                                            <p style="padding-left: 25px; padding-right: 25px;">
                                                            Please verify your email address to unlock more features!
                                                            </p>
                                                            
                                                            <a href="http://localhost:5000/users/authenticate/?token=${userData.token}" target="_blank">
                                                            <button
                                                                style="
                                                                width: 45%;
                                                                padding: 10px 20px 10px 20px;
                                                                background-color: #a74ef6;
                                                                
                                                                border-radius: 20px;
                                                                outline: 0;
                                                                border: 0;
                                                                cursor: pointer;
                                                                margin-bottom: 10px;
                                                                "
                                                                >
                                                                Verify Email Now
                                                                </button>
                                                            </a>
                                                        </div>
                                                        </div>
                                                        </body>
                                                    </html>`
                                            )

                                            Toast(
                                                'Check your email for a verification link!(Check your spam)',
                                                'info'
                                            )
                                        }}
                                    >
                                        Resend Email
                                    </p>
                                )
                            )}
                        </InputGroup>

                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <InputLabel>Password</InputLabel>
                            <TextboxInput
                                onChange={handleChange}
                                name='password'
                                type='password'
                                value={NewData?.password ?? ''}
                            />

                            {errors.password && (
                                <ErrorMessage>{errors.password}</ErrorMessage>
                            )}

                            <InputLabel>New Password</InputLabel>
                            <TextboxInput
                                onChange={handleChange}
                                name='newPassword'
                                type='password'
                                value={NewData?.newPassword ?? ''}
                            />
                            <InputButton
                                disabled={
                                    userData?.password?.trim() !=
                                        NewData?.password?.trim() ||
                                    NewData?.password?.trim() ==
                                        NewData?.newPassword?.trim()
                                }
                                name='newPassword'
                                onClick={updateItem}
                            >
                                Update
                            </InputButton>

                            {errors.newPassword && (
                                <ErrorMessage>
                                    {errors.newPassword}
                                </ErrorMessage>
                            )}
                        </InputGroup>
                    </Section>

                    <Section id='account-privacy'>
                        <SectionTitle>Privacy</SectionTitle>
                        {NewData?.id == null && (
                            <StyledSpinner animation='border' />
                        )}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <Checkbox
                                name='seePublicRecipes'
                                label='See public recipes'
                                checked={NewData?.settings?.seePublicRecipes}
                                onChange={updateSetting}
                            />
                            <Checkbox
                                name='sharePublicRecipes'
                                label='Share your public recipes'
                                checked={NewData.settings?.sharePublicRecipes}
                                onChange={updateSetting}
                            />
                        </InputGroup>
                    </Section>

                    <Section id='account-appearance'>
                        <SectionTitle>Appearance</SectionTitle>

                        {NewData?.id == null && (
                            <StyledSpinner animation='border' />
                        )}

                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                                marginTop: '20px',
                            }}
                        >
                            <div style={{ width: '100%', display: 'flex' }}>
                                <ThemeChooser
                                    name='selectedTheme'
                                    onChange={updateSetting}
                                >
                                    {userData.settings?.themes?.map((theme) => {
                                        return (
                                            <option
                                                selected={
                                                    userData.settings
                                                        ?.selectedTheme ==
                                                    theme.themeID
                                                }
                                                value={theme.themeID}
                                            >
                                                {theme.name}
                                            </option>
                                        )
                                    })}
                                </ThemeChooser>
                                <InputButton
                                    onClick={() =>
                                        setModalShow((prev) => {
                                            return {
                                                ...prev,
                                                createTheme: true,
                                            }
                                        })
                                    }
                                >
                                    Create
                                </InputButton>
                            </div>
                        </InputGroup>

                        {/* Background */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'bgcolor' ? '' : 'bgcolor'
                                    )
                                }
                            >
                                Background
                            </AppearanceColorTitle>
                            {visibleAppearance == 'bgcolor' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            background: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).background
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Secondary Background */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'bgcolor2' ? '' : 'bgcolor2'
                                    )
                                }
                            >
                                Secondary Background
                            </AppearanceColorTitle>
                            {visibleAppearance == 'bgcolor2' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            secondaryBackground: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).secondaryBackground
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Textbox Background */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'textbg' ? '' : 'textbg'
                                    )
                                }
                            >
                                Textbox Background
                            </AppearanceColorTitle>
                            {visibleAppearance == 'textbg' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            textboxBackground: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).textboxBackground
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Accent */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'accent' ? '' : 'accent'
                                    )
                                }
                            >
                                Accent
                            </AppearanceColorTitle>
                            {visibleAppearance == 'accent' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            accent: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).accent
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Secondary Accent */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'accent2' ? '' : 'accent2'
                                    )
                                }
                            >
                                Secondary Accent
                            </AppearanceColorTitle>
                            {visibleAppearance == 'accent2' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            secondaryAccent: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).secondaryAccent
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Foreground */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'foreground' ? '' : 'foreground'
                                    )
                                }
                            >
                                Foreground
                            </AppearanceColorTitle>
                            {visibleAppearance == 'foreground' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            foreground: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).foreground
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Secondary Foreground */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'foreground2'
                                            ? ''
                                            : 'foreground2'
                                    )
                                }
                            >
                                Secondary Foreground
                            </AppearanceColorTitle>
                            {visibleAppearance == 'foreground2' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            secondaryForeground: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).secondaryForeground
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Muted Color */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'muted' ? '' : 'muted'
                                    )
                                }
                            >
                                Muted Text
                            </AppearanceColorTitle>
                            {visibleAppearance == 'muted' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            muted: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).muted
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Faded Color */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'faded' ? '' : 'faded'
                                    )
                                }
                            >
                                Faded
                            </AppearanceColorTitle>
                            {visibleAppearance == 'faded' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            faded: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).faded
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Error Color */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'error' ? '' : 'error'
                                    )
                                }
                            >
                                Error
                            </AppearanceColorTitle>
                            {visibleAppearance == 'error' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            error: newColor.hex,
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).error
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Navbar background Color */}
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <AppearanceColorTitle
                                disabled={userData?.settings?.selectedTheme.startsWith(
                                    'default_themes'
                                )}
                                onClick={() =>
                                    setVisibleAppearance((prev) =>
                                        prev == 'navbarbg' ? '' : 'navbarbg'
                                    )
                                }
                            >
                                Navigation Bar Background
                            </AppearanceColorTitle>
                            {visibleAppearance == 'navbarbg' && (
                                <StyledSketchPicker
                                    onChangeComplete={async () => {
                                        const res = await users.editUser(
                                            userData.id,
                                            NewData
                                        )

                                        if (res.status != 201)
                                            Toast(
                                                'Failed to update theme...',
                                                'error'
                                            )
                                        else {
                                            setUserData(res.data)
                                        }
                                    }}
                                    onChange={(newColor) => {
                                        const index =
                                            NewData?.settings.themes.findIndex(
                                                (theme) =>
                                                    theme.themeID ==
                                                    userData.settings
                                                        .selectedTheme
                                            )

                                        let newThemes = NewData?.settings.themes
                                        newThemes[index] = {
                                            ...newThemes[index],
                                            navbar: {
                                                ...newThemes[index].navbar,
                                                background: newColor.hex,
                                            },
                                        }

                                        setNewData((prev) => {
                                            return {
                                                ...prev,
                                                settings: {
                                                    ...prev.settings,
                                                    themes: newThemes,
                                                },
                                            }
                                        })
                                    }}
                                    color={
                                        NewData?.settings?.themes?.find(
                                            (theme) =>
                                                theme.themeID ==
                                                userData.settings.selectedTheme
                                        ).navbar.background
                                    }
                                ></StyledSketchPicker>
                            )}
                        </InputGroup>

                        {/* Only displays delete button if the user created the theme */}
                        {!userData?.settings?.selectedTheme.startsWith(
                            'default_themes'
                        ) &&
                            NewData?.id != null && (
                                <InputButton
                                    name='deleteTheme'
                                    style={{ marginTop: '7px' }}
                                    onClick={updateSetting}
                                >
                                    Delete Theme
                                </InputButton>
                            )}
                    </Section>

                    <Section id='account-adv.settings'>
                        <SectionTitle>Advanced Settings</SectionTitle>
                        {NewData?.id == null && (
                            <StyledSpinner animation='border' />
                        )}

                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <InputLabel>
                                User ID:{' '}
                                <ShownOnHover
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            userData.id
                                        )
                                        Toast('Copied to clipboard!', 'info')
                                    }}
                                >
                                    {userData.id}
                                </ShownOnHover>
                            </InputLabel>
                        </InputGroup>
                        <InputGroup
                            style={{
                                display: NewData?.id == null ? 'none' : '',
                            }}
                        >
                            <InputButton
                                style={{ marginLeft: '0' }}
                                name='closeAccount'
                                onClick={() =>
                                    setModalShow((prev) => {
                                        return { ...prev, deleteAccount: true }
                                    })
                                }
                            >
                                Close Account
                            </InputButton>
                        </InputGroup>
                    </Section>
                </Sections>
            </DivBody>
        </>
    )
}

export default Account
