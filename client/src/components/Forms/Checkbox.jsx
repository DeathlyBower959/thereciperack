import { useContext } from 'react'
import { FormCheck } from 'react-bootstrap'
import styled, { ThemeContext } from 'styled-components'

const Check = styled(FormCheck)`
    .form-check-input {
        background-color: ${(props) => props.theme.textboxBackground};
        border: 0;
        cursor: pointer;
        width: 1.3em;
        height: 1.3em;
        margin-left: 10px;
    }
    .form-check-input:focus {
        box-shadow: none;
    }
`

const Checkbox = ({label, className, checked, ...props }) => {
    const theme = useContext(ThemeContext)
    return (
        <div style={{ display: 'flex' }}>
            <Check checked={checked} {...props} />
            <p style={{ marginLeft: '6px', color: theme.foreground }}>
                {label ?? 'No checkbox name'}
            </p>
        </div>
    )
}

export default Checkbox
