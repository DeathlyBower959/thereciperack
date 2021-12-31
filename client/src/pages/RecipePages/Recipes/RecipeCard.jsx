import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import defaultImage from '../../../assets/logo.svg'
import IsCrushed from '../../../contexts/IsCrushedContext'

const CardBody = styled(Container)`
    transition: transform 0.5s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }

    border-radius: 20px;
    margin-bottom: 15px;

    background-color: ${(props) => props.theme.thirdBackground};

    display: flex;
    padding: 0;
`

const ImageWrapper = styled(Col)`
    padding: 10px;
    min-height: 100px;
    min-width: 100px;
    ${(props) => props.isCrushed && 'width: 100%;'}
`

const CoverImage = styled.img`
    object-fit: cover;
    border-radius: 20px;
    height: 100%;
    min-height: 100px;
    min-width: 100px;
`

const CardInfo = styled(Col)`
    padding: 1rem;
`

const CardTitle = styled.h5`
    margin-bottom: 0px;
    margin-left: 10px;
    overflow-wrap: anywhere;
    word-break: break-all;

    color: ${(props) => props.theme.foreground};
`

const CardDescription = styled.p`
    margin-left: 10px;
    margin-top: 5px;

    color: ${(props) => props.theme.foreground};
    overflow-wrap: anywhere;
    word-break: break-all;
`

const CardTags = styled.p`
    margin: 2px auto 0px 18px;
    color: ${(props) => props.theme.muted};

    word-break: break-all;
    overflow-wrap: anywhere;
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

    const isCrushed = useContext(IsCrushed)

    const theme = useContext(ThemeContext)

    const [loading, setLoading] = useState(true)

    return (
        <CardBody style={{ display: isCrushed ? 'block' : 'flex' }}>
            <ImageWrapper sm={3} isCrushed={isCrushed}>
                {loading && <StyledSpinner animation='border' />}

                <Link to={`/cookbook/${id}`}>
                    <CoverImage
                        src={coverImage ?? defaultImage}
                        isCrushed={isCrushed}
                        style={{
                            display: loading ? 'none' : 'block',
                        }}
                        alt='Not found... :('
                        onLoad={() => setLoading(false)}
                    />
                </Link>
            </ImageWrapper>
            <CardInfo sm={7}>
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
                    {tags.join(', ').trim()}
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
            </CardInfo>
        </CardBody>
    )
}

export default CookbookCard
