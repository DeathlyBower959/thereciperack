import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const LinkDiv = styled.div`
    color: ${(props) => props.theme.muted};
    transition: color 300ms ease;

    &:hover {
        color: ${(props) => props.theme.secondaryForeground};
    }
`

const NavLink = ({ path, title, ...props }) => {
    return (
        <Nav.Link as={Link} to={path} {...props}>
            <LinkDiv style={{ cursor: 'pointer' }}>{title}</LinkDiv>
        </Nav.Link>
    )
}

export default NavLink
