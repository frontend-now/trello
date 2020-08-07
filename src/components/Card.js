import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { Draggable } from 'react-beautiful-dnd'
import { FiEdit2 as EditIcon, FiTrash2 as DeleteIcon } from 'react-icons/fi'
import React, { useState } from 'react'

import { editCard, deleteCard } from 'actions/cardActions'
import BaseButton from 'components/buttons/BaseButton'
import CreateForm from 'components/forms/CreateForm'
import useHover from 'hooks/useHover'

const useStyles = createUseStyles(() => {
  const iconStyles = {
    position: 'absolute',
    top: 10
  }

  return {
    cardContainer: {
      padding: [ 10, 26 ],
      background: '#fff',
      margin: 10,
      borderRadius: 5,
      boxShadow: '0px 0px 7px 0px #0000000f',
      position: 'relative',

      '&:hover': {
        background: '#eee'
      },

      '& p': {
        margin: 0
      }
    },
    editIcon: {
      ...iconStyles,
      right: 40
    },
    deleteIcon: {
      ...iconStyles,
      right: 10
    }
  }
})

const Card = React.memo(({ text, id, listID, index, dispatch }) => {
  const [ isEditing, setIsEditing ] = useState(false)
  const [ cardText, setText ] = useState(text)
  const [ isHovering, hoverProps ] = useHover()

  const classes = useStyles()

  const closeForm = () => { setIsEditing(false) }
  const handleChange = (e) => setText(e.target.value)

  const saveCard = (e) => {
    e.stopPropagation()

    dispatch(editCard(id, listID, cardText))
    setIsEditing(false)
  }

  const handleDeleteCard = () => {
    dispatch(deleteCard(id, listID))
  }

  const renderEditForm = () => (
    <CreateForm variant="card" text={cardText} onChange={handleChange} closeForm={closeForm}>
      <BaseButton onClick={saveCard} label="Save" type="submit" />
    </CreateForm>
  )

  const renderCard = () => (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={() => setIsEditing(true)}
        >
          <div className={classes.cardContainer} {...hoverProps}>
            {isHovering && <EditIcon className={classes.editIcon} onMouseDown={() => setIsEditing(true)} />}
            {isHovering && <DeleteIcon className={classes.deleteIcon} onMouseDown={handleDeleteCard} />}
            <p>{text}</p>
          </div>
        </div>
      )}
    </Draggable>
  )

  return isEditing ? renderEditForm() : renderCard()
})

export default connect()(Card)
