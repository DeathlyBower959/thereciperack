import { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import IsCrushedContext from '../../../contexts/IsCrushedContext'
import AccountContext from '../../../contexts/AccountContext'
import Pages from '../../../components/Pages/Pages'
import Form from '../../../components/Forms/Form'

const DivBody = styled(Pages.PageBody)`
    width: 80%;
`

const SearchBox = styled.input`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(props) => props.theme.foreground};
    background-color: ${(props) => props.theme.inputBackground};
    appearance: none;
    border-radius: 0.5rem;

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
    background-color: ${(props) => props.theme.inputBackground};
    border-radius: 0.5rem;

    border-width: 0;
    outline: 0;
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
                    <Form.Button
                        style={{ marginLeft: '10px' }}
                        disabled={userData == null || userData == undefined}
                    >
                        New
                    </Form.Button>
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
