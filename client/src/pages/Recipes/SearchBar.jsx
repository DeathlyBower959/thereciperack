import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import IsCrushedContext from '../../contexts/IsCrushedContext'
import AccountContext from '../../contexts/AccountContext'

const DivBody = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    margin: 50px auto;
    background-color: ${(props) => props.theme.secondaryBackground};
    position: relative;
    overflow: hidden;
`

const SearchBox = styled.input`
    display: block;
    width: 100%;
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
`

const TagSelect = styled.select`
    display: block;
    padding: 0.475rem 2.25rem 0.475rem 0.55rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(props) => props.theme.muted};
    background-color: ${(props) => props.theme.textboxBackground};
    border-radius: 0.25rem;

    border-width: 0;
    outline: 0;
`

const NewButton = styled.button`
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
        filter: brightness(0.4);
    }
`

const SearchBar = ({ tagOptions }) => {
    const isCrushed = useContext(IsCrushedContext)
    const { userData } = useContext(AccountContext)

    const [searchField, setSearchField] = useState('')
    const [tagField, setTagField] = useState('none')

    const handleChange = (e, type) => {
        if (type === 'search') setSearchField(e.target.value)
        else if (type === 'tag') setTagField(e.target.value)
    }

    return (
        <DivBody>
            <div
                style={{
                    width: '100%',
                    margin: `10px auto 10px auto`,
                    display: 'flex',
                }}
            >
                <SearchBox
                    placeholder='Search Cookbooks'
                    aria-label='Search Cookbooks'
                    onChange={(e) => handleChange(e, 'search')}
                />
                {isCrushed ? (
                    ''
                ) : (
                    <TagSelect
                        value={tagField}
                        onChange={(e) => handleChange(e, 'tag')}
                        style={{ marginLeft: '10px', width: '30%' }}
                    >
                        <option value='none'>Choose...</option>
                        {tagOptions}
                    </TagSelect>
                )}
                <Link to='/create'>
                    <NewButton
                        style={{ marginLeft: '10px' }}
                        disabled={userData == null || userData == undefined}
                    >
                        New
                    </NewButton>
                </Link>
            </div>
            {!isCrushed ? (
                ''
            ) : (
                <div
                    style={{
                        width: '100%',
                        margin: `10px auto 10px auto`,
                        display: 'flex',
                    }}
                >
                    <TagSelect
                        value={tagField}
                        onChange={(e) => handleChange(e, 'tag')}
                        style={{ width: '100%' }}
                    >
                        <option value='none'>Choose...</option>
                        {tagOptions}
                    </TagSelect>
                </div>
            )}

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div style={{ width: '55%' }}>Items</div>
            </div>
        </DivBody>
    )
}

export default SearchBar
