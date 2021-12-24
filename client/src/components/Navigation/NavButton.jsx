import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const LinkDiv = styled.div`
    padding: 0.5rem 1rem;
    margin-right: -3px;
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

const NavButton = ({ path, title }) => {
    return (
        <Nav.Link style={{ padding: '0' }} as={Link} to={path}>
            <LinkDiv style={{ cursor: 'pointer' }}>{title}</LinkDiv>
        </Nav.Link>
    )
}

export default NavButton
