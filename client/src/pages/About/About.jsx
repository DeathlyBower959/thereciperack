import React, { useContext, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import settings from '../../settings'
import { IoConstructSharp } from 'react-icons/io5'
import Pages from '../../components/Pages/Pages'

const DivClamp = styled.div`
    text-align: center;
    width: 50%;
    margin: auto;
`

const Header = styled.h2`
    padding: 40px 0px 0px 0px;
    color: ${(props) => props.theme.secondaryForeground};
    font-weight: bold;
`

const SectionTitle = styled.h3`
    color: ${(props) => props.theme.foreground};
    margin-top: 20px;
`

const Description = styled.p`
    font-size: 20px;
    color: ${(props) => props.theme.secondaryForeground};
`

const About = () => {
    const theme = useContext(ThemeContext)

    return (
        <Pages.PageBody>
            <DivClamp>
                <Header>About</Header>

                <SectionTitle>Creator</SectionTitle>
                <Description>
                    My name is Benjamin, and I am a 13 year old developer, that
                    strives to learn more. I wanted to learn something along the
                    lines of web development. I didn't want to just use html,
                    css, and js, I wanted to try something new! I looked around,
                    and I eventually found a framework called React. Put very
                    simply, it allows me to create much cleaner user interfaces,
                    with much more interactive pages, and a faster websites.
                </Description>

                <SectionTitle>The Purpose</SectionTitle>
                <Description>
                    I had found some tutorials showing how to create some React
                    projects, but I soon found myself in tutorial hell. I was
                    just following along, not really learning. Since the best
                    way for me to learn is to teach myself, I decided to come up
                    with a project. I didn't want to make a pointless project,
                    one that wasn't used. I wanted to create something my
                    family, and friends could use. I eventually came up with
                    this idea when I was helping my mother cook. She kept having
                    to switch between recipes, and it seemed very annoying. I
                    decided to make this website to help manage, and share your
                    recipes. I know that they are many websites out there just
                    like this, but I wanted it to have more features, no ads,
                    and a cleaner ui!
                </Description>

                <SectionTitle>How was it made?</SectionTitle>
                <Description>
                    Since this was my first <i>real</i> React project, that I
                    was doing without a tutorial, Stack Overflow, Youtube, and
                    Google were my best friends. I first figured out how to make
                    the client side of the website, the part that you see. It
                    took a bit to figure out, but I picked it up in the end. I
                    then had to learn how to make the sever side, the part that
                    creates your account, and saves your data and settings. This
                    bit was a little harder than I had originally thought it
                    would be, but it worked out in the end. It's really nice to
                    see that I thought about the code that went into this
                    website, and that I can be proud of it, instead of just
                    writing the code from videos online.
                </Description>

                {settings.activeDevelopment && (
                    <h5 style={{ color: theme.error }}>
                        <IoConstructSharp /> Development underway...{' '}
                        <IoConstructSharp />
                    </h5>
                )}

                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <a
                        href='https://github.com/DeathlyBower959/thereciperack'
                        target='_blank'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='50'
                            height='50'
                            viewBox='0 0 24 24'
                        >
                            <path
                                fill={theme.foreground}
                                d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'
                            />
                        </svg>
                    </a>
                    <a
                        href='https://youtube.com/DeathlyBower959?sub_confirmation=1'
                        target='_blank'
                    >
                        <svg
                            style={{ marginLeft: '10px' }}
                            xmlns='http://www.w3.org/2000/svg'
                            width='50'
                            height='50'
                            viewBox='0 0 24 24'
                        >
                            <path
                                fill={theme.foreground}
                                d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z'
                            />
                        </svg>
                    </a>
                </div>
            </DivClamp>
        </Pages.PageBody>
    )
}

export default About
