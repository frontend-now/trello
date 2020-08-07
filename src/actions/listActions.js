import { v4 as uuid } from 'uuid'

const addList = (title) => (dispatch, getState) => {
  const boardId = getState().activeBoard
  const id = uuid()

  dispatch({
    type: 'ADD_LIST',
    payload: { title, boardId, id }
  })
}

const moveList = (
  droppableIdStart, droppableIdEnd, droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => (dispatch, getState) => {
  const boardId = getState().activeBoard

  dispatch({
    type: 'DRAG_LISTS',
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

const editTitle = (listID, newTitle) => ({
  type: 'EDIT_LIST_TITLE',
  payload: {
    listID,
    newTitle
  }
})

const deleteList = (listID) => (dispatch, getState) => {
  const boardId = getState().activeBoard

  return dispatch({
    type: 'DELETE_LIST',
    payload: {
      listID,
      boardId
    }
  })
}

export { addList, moveList, editTitle, deleteList }
