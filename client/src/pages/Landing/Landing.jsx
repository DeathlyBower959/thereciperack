import { useContext } from 'react'
import styled from 'styled-components'
import AccountContext from '../../contexts/AccountContext'
import ToastNotifContext from '../../contexts/ToastNotifContext'

const DivBody = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.58);
    position: relative;
    overflow: hidden;
    border-radius: 20px;
`

const Landing = () => {
    const { userData } = useContext(AccountContext)

    return (
        <DivBody>
            {/* <SearchBar /> */}
        </DivBody>
    )
}

export default Landing
