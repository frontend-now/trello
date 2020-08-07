/* eslint-disable no-case-declarations */
const initialState = {
  0: {
    id: '0',
    cards: [ 'card-0' ],
    title: 'Backlog',
    board: '0'
  },
  1: {
    id: '1',
    cards: [ 'card-1' ],
    title: 'Priorities',
    board: '0'
  },
  2: {
    id: '2',
    cards: [ ],
    title: 'Void',
    board: '1'
  }
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const { title, id } = action.payload
      const newList = {
        title,
        id,
        cards: []
      }

      const newState = { ...state, [id]: newList }

      return newState
    }

    case 'ADD_CARD': {
      const { listID, id } = action.payload
      const list = state[listID]
      list.cards.push(`card-${id}`)
      return { ...state, [listID]: list }
    }

    case 'DRAG_CARDS': {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart
      } = action.payload

      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart]
        const card = list.cards.splice(droppableIndexStart, 1)
        list.cards.splice(droppableIndexEnd, 0, ...card)

        return { ...state, [droppableIdStart]: list }
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state[droppableIdStart]
        const card = listStart.cards.splice(droppableIndexStart, 1)

        const listEnd = state[droppableIdEnd]
        listEnd.cards.splice(droppableIndexEnd, 0, ...card)

        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        }
      }
      return state
    }

    case 'DELETE_CARD': {
      const { listID, id } = action.payload

      const list = state[listID]
      const newCards = list.cards.filter((cardID) => cardID !== id)

      return { ...state, [listID]: { ...list, cards: newCards } }
    }

    case 'EDIT_LIST_TITLE': {
      const { listID, newTitle } = action.payload
      const list = state[listID]
      list.title = newTitle

      return { ...state, [listID]: list }
    }

    case 'DELETE_LIST': {
      const { listID } = action.payload
      const newState = state
      delete newState[listID]
      return newState
    }

    default:
      return state
  }
}

export default listsReducer
