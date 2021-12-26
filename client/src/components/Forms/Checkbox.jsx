import { useContext } from 'react'
import { FormCheck } from 'react-bootstrap'
import styled, { ThemeContext } from 'styled-components'

const Check = styled(FormCheck)`
    .form-check-input:checked[type='checkbox'] {
        background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23${props => props.theme.secondaryForeground.substring(1)}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\")!important;
    }
    .form-check-input {
        background-color: ${(props) => props.theme.inputBackground};
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

const Checkbox = ({ label, checked, ...props }) => {
    const theme = useContext(ThemeContext)
    return (
        <div style={{ display: 'flex' }}>
            <Check checked={checked || false} {...props} />
            <p
                style={{
                    marginLeft: '6px',
                    paddingTop: '2px',
                    color: theme.foreground,
                }}
            >
                {label ?? 'No checkbox name'}
            </p>
        </div>
    )
}

export default Checkbox
