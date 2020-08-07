import { useDispatch } from 'react-redux'
import FormPlaceHolder from 'components/forms/FormPlaceHolder'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import CreateForm from 'components/forms/CreateForm'

import { addCard } from 'actions/cardActions'
import { addList } from 'actions/listActions'
import BaseButton from 'components/buttons/BaseButton'
import { addBoard } from '../actions/boardAction'

const VARIANTS_LABEL = {
  list: 'Add a list',
  card: 'Add a card',
  board: 'Add a board'
}

const BUTTON_LABEL = {
  list: 'Add List',
  card: 'Add Card',
  board: 'Add Board'
}

function InlineCreate({ listID, variant }) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ text, setText ] = useState('')
  const dispatch = useDispatch()
  const isList = variant !== 'card'

  const openForm = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsOpen(true)
  }

  const closeForm = () => setIsOpen(false)
  const handleInputChange = (e) => setText(e.target.value)

  const handleAddList = useCallback(() => {
    if (text) {
      setText('')
      dispatch(addList(text))
      closeForm()
    } else {
      closeForm()
    }
  }, [ dispatch, text ])

  const handleAddCard = useCallback(() => {
    if (text) {
      setText('')
      dispatch(addCard(listID, text))
      closeForm()
    } else {
      closeForm()
    }
  }, [ dispatch, listID, text ])

  const handleAddBoard = useCallback(() => {
    if (text) {
      setText('')
      dispatch(addBoard(text))
      closeForm()
    } else {
      closeForm()
    }
  }, [ dispatch, text ])

  const onButtonClick = useMemo(() => ({
    list: handleAddList,
    card: handleAddCard,
    board: handleAddBoard
  }), [ handleAddBoard, handleAddCard, handleAddList ])

  return isOpen ? (
    <CreateForm
      text={text}
      onChange={handleInputChange}
      closeForm={closeForm}
      isList={isList}
      variant={variant}
    >
      <BaseButton onClick={onButtonClick[variant]} label={BUTTON_LABEL[variant]} />
    </CreateForm>
  ) : (
    <FormPlaceHolder isList={isList} onClick={openForm}>
      {VARIANTS_LABEL[variant]}
    </FormPlaceHolder>
  )
}

InlineCreate.propTypes = {
  variant: PropTypes.string,
  listID: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

InlineCreate.defaultProps = {
  variant: 'card',
  listID: null
}

export default InlineCreate
