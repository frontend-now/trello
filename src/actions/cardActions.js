import { v4 as uuid } from 'uuid'

const addCard = (listID, text) => {
  const id = uuid()
  return {
    type: 'ADD_CARD',
    payload: { text, listID, id }
  }
}

const moveCard = (
  droppableIdStart, droppableIdEnd, droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => (dispatch, getState) => {
  const boardId = getState().activeBoard

  dispatch({
    type: 'DRAG_CARDS',
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart,
      draggableId,
      boardId
    }
  })
}

const editCard = (id, listID, newText) => ({
  type: 'EDIT_CARD',
  payload: { id, listID, newText }
})

const deleteCard = (id, listID) => ({
  type: 'DELETE_CARD',
  payload: { id, listID }
})

export { addCard, moveCard, editCard, deleteCard }
