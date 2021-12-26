import { useContext, useEffect, useRef, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'

const File = styled.input.attrs({ type: 'file' })`
    display: none;
`

const FileDiv = styled.div`
    background-color: ${(props) => props.theme.inputBackground};
    height: 42px;
    font-size: 12px;
    display: flex;
    border-radius: 0.5rem;
`

const Title = styled.input.attrs({ disabled: true })`
    height: 42px;
    outline: none;
    padding: 0px 10px 0px 5px;
    font-size: 12px;
    border: 0;
    &::placeholder {
        color: ${(props) => props.theme.muted};
    }
    background-color: transparent;
`

const ChooseFile = styled.button`
    background-color: ${(props) => props.theme.inputBackground};
    border: 0;
    border-right: solid 2px ${(props) => props.theme.secondaryBackground};
    outline: 0;
    color: ${(props) => props.theme.muted};
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;

    transition: filter 250ms ease-in-out;

    &:hover {
        filter: brightness(0.9);
    }
`

const DeleteButton = styled.button`
    color: red;
    width: 20px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0);
    border-width: 0px;
    margin-left: 5px;
`

const FileInput = ({ label, className, inputRef, ...props }) => {
    const [selectedFileName, setSelectedFile] = useState()
    useEffect(() => {
        setSelectedFile(inputRef.current.files[0]?.name)
    }, [inputRef, inputRef.current?.value, inputRef.current?.files])

    return (
        <>
            <File ref={inputRef} {...props} />

            <FileDiv>
                {selectedFileName != null ? (
                    <DeleteButton
                        type='button'
                        onClick={() => {
                            inputRef.current.value = null
                            props.onChange({ target: {name: inputRef.current.name, files: []} })
                            setSelectedFile(null)
                        }}
                    >
                        X
                    </DeleteButton>
                ) : (
                    <ChooseFile
                        onClick={() => inputRef.current.click()}
                        type='button'
                    >
                        Choose File
                    </ChooseFile>
                )}
                <Title placeholder={selectedFileName ?? label} />
            </FileDiv>
        </>
    )
}

export default FileInput
