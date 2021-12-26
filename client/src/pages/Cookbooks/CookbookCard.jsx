import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

import defaultImage from '../../assets/logo.svg'

const CardBody = styled.div`
    transition: transform 0.5s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }

    border-radius: 15px;
    margin-bottom: 15px;

    background-color: ${(props) => props.theme.thirdBackground};
`

const ImageWrapper = styled.div`
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-right: 0px;
    width: 200px;
`
const CardTitle = styled.h5`
    margin-bottom: 0px;
    margin-left: 10px;

    color: ${(props) => props.theme.foreground};
`

const CardDescription = styled.p`
    margin-left: 10px;
    margin-top: 5px;

    color: ${(props) => props.theme.foreground};
`

const CardTags = styled.p`
    margin: 2px auto 0px 18px;
    color: ${(props) => props.theme.muted};
`

const StyledSpinner = styled(Spinner)`
    border-color: ${(props) => props.theme.accent};
    border-right-color: transparent;
`

const CookbookCard = ({ cookbook, deleteCookbook }) => {
    const {
        name = 'No Name',
        coverImage,
        description = 'No Description',
        tags,
        id,
    } = cookbook

    const theme = useContext(ThemeContext)

    const [loading, setLoading] = useState(true)

    return (
        <CardBody>
            <div className='row no-gutters'>
                <ImageWrapper className='col-sm-3'>
                    {loading && <StyledSpinner animation='border' />}

                    <Link to={`/cookbook/${id}`}>
                        <img
                            src={coverImage ?? defaultImage}
                            style={{
                                borderRadius: '10px',
                                display: loading ? 'none' : 'block',
                            }}
                            className='card-img-top h-100'
                            alt='Not found... :('
                            onLoad={() => setLoading(false)}
                        />
                    </Link>
                </ImageWrapper>
                <div
                    className='col-sm-7'
                    style={{ paddingLeft: '0px', paddingTop: '3px' }}
                >
                    <div className='card-body'>
                        <Link
                            style={{
                                color: '#000',
                                textDecoration: 'none',
                            }}
                            to={`/cookbook/${id}`}
                        >
                            <CardTitle className='card-title'>{name}</CardTitle>
                        </Link>
                        <CardTags className='card-text'>
                            {tags.join(', ').trim().slice(0, -1)}
                        </CardTags>
                        <hr
                            style={{
                                margin: '10px auto 10px 10px',
                                filter: 'blur(1px)',
                                color: theme.foreground,
                            }}
                        />
                        <CardDescription className='card-text'>
                            {description}
                        </CardDescription>
                        <div>
                            <Link to={`/cookbook/${id}/edit`}>
                                <Button style={{ margin: '5px 5px 0px 5px' }}>
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                style={{ margin: '5px 5px 0px 5px' }}
                                variant='danger'
                                onClick={() => deleteCookbook(id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </CardBody>
    )
}

export default CookbookCard
