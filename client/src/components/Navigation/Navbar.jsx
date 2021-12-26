import { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { Fade as Hamburger } from 'hamburger-react'
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Spinner,
} from 'react-bootstrap'
import IsCrushedContext from '../../contexts/IsCrushedContext'

import NavBarComponents from './Navbar.js'
import AccountContext from '../../contexts/AccountContext'

import Logo from '../../assets/logo.svg'

const DropdownItem = styled(NavDropdown.Item)`
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.muted};
    clear: both;
    font-weight: 400;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;

    transition: color 300ms ease;

    &:hover {
        color: ${(props) => props.theme.secondaryForeground};
    }
`

const NavigationDropdown = styled(NavDropdown)`
    .dropdown-menu.show {
        background-color: ${(props) => props.theme.secondaryBackground};
    }

    .dropdown-toggle.nav-link {
        color: ${(props) => props.theme.muted} !important;
        transition: color 300ms ease;

        &:hover {
            color: ${(props) => props.theme.secondaryForeground} !important;
        }
    }
`

const RightNavigationDropdown = styled(NavDropdown)`
    .dropdown-menu.show {
        background-color: ${(props) => props.theme.secondaryBackground};
    }

    .dropdown-toggle.nav-link {
        color: ${(props) => props.theme.muted} !important;
        transition: color 300ms ease;

        &:hover {
            color: ${(props) => props.theme.secondaryForeground} !important;
        }
        padding-left: 0;
    }
`

const StyledSpinner = styled(Spinner)`
    border-color: ${(props) => props.theme.accent};
    border-right-color: transparent;
`

const NavigationBar = () => {
    const theme = useContext(ThemeContext)
    const isCrushed = useContext(IsCrushedContext)
    const { userData, AuthLogout } = useContext(AccountContext)

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <Navbar
            sticky='top'
            style={{ background: theme.navbar.background }}
            expand='md'
        >
            <Container fluid>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <img
                        alt=''
                        src={Logo}
                        style={{ transform: 'rotate(7deg)' }}
                        width='30'
                        height='30'
                        className='align-top'
                    />{' '}
                    <Navbar.Brand style={{ color: theme.foreground }}>
                        The Recipe Rack
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle
                    style={{ borderWidth: '0' }}
                    aria-controls='basic-navbar-nav'
                >
                    <Hamburger
                        color={theme.foreground}
                        toggled={menuOpen}
                        toggle={setMenuOpen}
                        rounded
                    />
                </Navbar.Toggle>

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto my-2 my-lg-0' navbarScroll>
                        {/* <NavigationDropdown title='Test'>
                            <DropdownItem as={Link} to='/link'>
                                Link
                            </DropdownItem>
                            <NavDropdown.Divider />
                        </NavigationDropdown> */}
                        <NavBarComponents.Link title='My Cookbooks' path='/cookbooks' />
                        <NavBarComponents.Link title='About' path='/about' />
                    </Nav>
                    <Nav>
                        {isCrushed && <NavDropdown.Divider />}

                        {userData == null || userData == undefined ? (
                            <>
                                <NavBarComponents.Link title='Sign up' path='/signup' style={{marginRight: '8px'}}/>
                                {isCrushed ? (
                                    <NavBarComponents.Link title='Login' path='/login' />
                                ) : (
                                    <NavBarComponents.Button title='Login' path='/login' />
                                )}
                            </>
                        ) : userData == 'none' ? (
                            <StyledSpinner animation='border' />
                        ) : (
                            <RightNavigationDropdown
                                align='end'
                                title={userData?.name ?? 'My Account'}
                            >
                                <DropdownItem as={Link} to='/account'>
                                    My Account
                                </DropdownItem>
                                <NavDropdown.Divider />
                                <DropdownItem
                                    as={Link}
                                    to='#'
                                    onClick={AuthLogout}
                                >
                                    Sign out
                                </DropdownItem>
                            </RightNavigationDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar
