import React, { useContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Alert } from 'react-bootstrap'
import { ThemeContext } from 'styled-components'
import Account from '../../../contexts/AccountContext'
import CookbookCard from './CookbookCard'

const CookbooksList = ({ filteredCookbooks, deleteCookbook }) => {
    const theme = useContext(ThemeContext)

    const { userData, setUserData } = useContext(Account)

    const handleDragEnd = (res) => {
        if (!res.destination) return

        const items = Array.from(filteredCookbooks)
        const [reorderedItem] = items.splice(res.source.index, 1)
        items.splice(res.destination.index, 0, reorderedItem)

        setUserData(prev => { 
            return {
                ...prev,
                cookbooks: items
            }
        })
    }

    return (
        <div>
            {filteredCookbooks?.length > 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId='cookbookListDrop'>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredCookbooks.map((book, index) => {
                                    return (
                                        <Draggable
                                            key={book.id}
                                            draggableId={book.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <CookbookCard
                                                        cookbook={book}
                                                        deleteCookbook={
                                                            deleteCookbook
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <Alert
                    style={{
                        marginTop: '15px',
                        backgroundColor: theme.alert.background,
                        color: theme.alert.color,
                        borderColor: theme.alert.border,
                    }}
                    variant='danger'
                >
                    <Alert.Heading>Hmm...</Alert.Heading>
                    <p>Seems like there are no cookbooks with that name!</p>
                </Alert>
            )}
            <div style={{ marginTop: '20px' }} />
        </div>
    )
}

export default CookbooksList
