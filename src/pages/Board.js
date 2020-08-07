/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { createUseStyles } from 'react-jss'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React, { memo, useEffect, useState } from 'react'

import { moveCard } from 'actions/cardActions'
import { moveList } from 'actions/listActions'
import { setActiveBoard } from 'actions/boardAction'
import BoardLayout from 'components/layouts/BoardLayout'
import InlineCreate from 'components/InlineCreate'
import List from 'components/List'
import { renameBoard } from '../actions/boardAction'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    maxWidth: '90vw',

    '& > *:not(:last-child)': {
      marginRight: 10
    }
  },
  title: {
    color: '#fff'
  }
})

const useFormStyles = createUseStyles({
  renameBoardInput: {
    margin: [ 19, 0 ],
    outline: 'none',
    border: 'none',
    background: 'transparent',
    fontSize: 20,
    color: '#fff',
    fontWeight: 600,
    fontStyle: 'italic',
    fontFamily: 'inherit'
  }
})

function RenameBoardsInput({ handleFinishEditing, value, handleChange, handleFocus }) {
  const classes = useFormStyles()

  return (
    <form onSubmit={handleFinishEditing}>
      <input
        className={classes.renameBoardInput}
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

const useBoardTitleStyle = createUseStyles({
  boardTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 600
  }
})

function BoardTitle({ initiaTitle, id }) {
  const classes = useBoardTitleStyle()
  const dispatch = useDispatch()
  const [ isEditing, setIsEditing ] = useState(false)
  const [ boardTitle, setBoardTitle ] = useState(initiaTitle)

  useEffect(() => {
    setBoardTitle(initiaTitle)
  }, [ initiaTitle ])

  const triggerEdit = () => setIsEditing(true)
  const closeEdior = () => {
    setIsEditing(false)
  }

  const handleFinishEditing = (e) => {
    e.preventDefault()

    if (boardTitle) {
      setIsEditing(false)
      // setBoardTitle(editedListTitle)
      dispatch(renameBoard(boardTitle, id))
    } else {
      setIsEditing(false)
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    setBoardTitle(e.target.value)
  }

  return (
    <>
      { isEditing
        ? (
          <RenameBoardsInput
            handleFinishEditing={handleFinishEditing}
            value={boardTitle}
            handleChange={handleInputChange}
          />
        )
        : (
          <p onBlur={closeEdior} onKeyDown={triggerEdit} onClick={triggerEdit} className={classes.boardTitle}>
            {initiaTitle}
          </p>
        )}
    </>
  )
}

function Board() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { id: boardId } = useParams()

  useEffect(() => {
    if (boardId) {
      dispatch(setActiveBoard(boardId))
    }
  }, [ boardId, dispatch ])

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (type === 'list') {
      dispatch(
        moveList(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
          draggableId,
          type
        )
      )
    } else {
      dispatch(
        moveCard(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
          draggableId,
          type
        )
      )
    }
  }

  const lists = useSelector((state) => state.lists)
  const cards = useSelector((state) => state.cards)
  const boards = useSelector((state) => state.boards)

  const board = boards[boardId]

  const boardLists = board?.lists

  return (
    <BoardLayout boards={boards} activeBoard={board}>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardTitle initiaTitle={board?.title} id={boardId} />
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className={classes.container}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardLists?.map((listID, index) => {
                const list = lists[listID]

                if (!list) return null

                const listCards = list.cards.map((cardID) => cards[cardID])

                return (
                  <List
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={listCards}
                    index={index}
                  />
                )
              })}
              {provided.placeholder}
              <InlineCreate variant="list" />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </BoardLayout>
  )
}

export default memo(Board)
