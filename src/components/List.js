/* eslint-disable no-dupe-args */
/* eslint-disable jsx-a11y/no-autofocus */
import { createUseStyles } from 'react-jss'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'

import { editTitle, deleteList } from 'actions/listActions'
import Card from 'components/Card'
import InlineCreate from 'components/InlineCreate'

const useStyles = createUseStyles({
  container: {
    backgroundColor: '#ebecf0',
    borderRadius: 3,
    minWidth: 300,
    padding: 8,
    height: '100%',
    margin: [ 0, 5, 0, 0 ],
    width: 300
  },
  input: {
    width: '100%',
    border: 'none',
    borderRadius: 3,
    marginBottom: 3,
    padding: 5
  },
  listTtle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: [ 10, 18 ]
  }
})

const useFormStyles = createUseStyles({
  renameListInput: {
    padding: [ 10, 6 ],
    fontSize: 14,
    margin: [ 0, 10 ],
    width: '95%;',
    borderRadius: 4,
    border: 'none',

    '&:hover, &:focus': {
      outline: 'none',
      border: '2px solid blue'
    }
  }
})

function RenameListForm({ handleFinishEditing, value, handleChange, handleFocus }) {
  const classes = useFormStyles()

  return (
    <form onSubmit={handleFinishEditing}>
      <input
        className={classes.renameListInput}
        type="text"
        autoFocus
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleFinishEditing}
      />
    </form>
  )
}

const List = ({ title, cards, listID, index }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [ isEditing, setIsEditing ] = useState(false)
  const [ listTitle, setListTitle ] = useState(title)
  const [ editedListTitle, setEditedListTitle ] = useState(title)

  const handleChange = (e) => {
    e.preventDefault()
    setEditedListTitle(e.target.value)
  }

  const handleFinishEditing = (e) => {
    e.preventDefault()

    if (editedListTitle) {
      setIsEditing(false)
      dispatch(editTitle(listID, editedListTitle))
      setListTitle(editedListTitle)
    } else {
      setIsEditing(false)
    }
  }

  const handleFocus = (e) => { e.target.select() }

  const handleDeleteList = () => {
    dispatch(deleteList(listID))
  }

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <div
          className={classes.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(dropProvided) => (
              <div>
                {isEditing ? (
                  <RenameListForm
                    handleFinishEditing={handleFinishEditing}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    value={editedListTitle}
                  />
                )
                  : (
                    <div
                      tabIndex={0}
                      role="button"
                      onKeyPress={() => setIsEditing(true)}
                      className={classes.listTtle}
                      onClick={() => setIsEditing(true)}
                    >
                      <span>{listTitle}</span>
                      <DeleteIcon onClick={handleDeleteList} width={25} />
                    </div>
                  )}
                <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                  {cards.map((card, cardIndex) => (
                    <Card
                      key={card.id}
                      text={card.text}
                      id={card.id}
                      index={cardIndex}
                      listID={listID}
                    />
                  ))}
                  {dropProvided.placeholder}
                  <InlineCreate variant="card" listID={listID} />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default List
