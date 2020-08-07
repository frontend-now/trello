const initialState = {
  0: {
    id: '0',
    lists: [ '0', '1' ],
    title: 'Kubric UI',
    background: 'https://images.unsplash.com/photo-1596547890618-09fd8704144e?q=75&fm=jpg&w=1080&fit=max'
  },
  1: {
    id: '1',
    lists: [ '2' ],
    title: 'Kubric UI II',
    background: 'https://images.unsplash.com/photo-1596295055846-004201253577?q=75&fm=jpg&w=1080&fit=max'
  }
}

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const { boardId, id } = action.payload
      const board = state[boardId]
      const newListID = id
      const newLists = [ ...board.lists, newListID ]
      board.lists = newLists

      return { ...state, [boardId]: board }
    }

    case 'DRAG_LISTS': {
      const { droppableIndexEnd, droppableIndexStart, boardId } = action.payload
      const board = state[boardId]

      const { lists } = board

      const pulledOutList = lists.splice(droppableIndexStart, 1)
      lists.splice(droppableIndexEnd, 0, ...pulledOutList)
      board.lists = lists

      return { ...state, [boardId]: board }
    }

    case 'DELETE_LIST': {
      const { listID, boardId } = action.payload
      const board = state[boardId]
      const { lists } = board
      const newLists = lists.filter((id) => id !== listID)
      board.lists = newLists

      return { ...state, [boardId]: board }
    }

    case 'ADD_BOARD': {
      const { title, id, background } = action.payload

      const newBoard = {
        id,
        title,
        lists: [],
        background
      }

      return { ...state, [id]: newBoard }
    }

    case 'RENAME_BOARD': {
      const { title, id } = action.payload
      const board = state[id]

      board.title = title

      return { ...state, [id]: board }
    }

    case 'DELETE_BOARD': {
      const { id } = action.payload
      const { [id]: value, ...rest } = state

      return { ...rest }
    }

    default:
      return state
  }
}

export default boardsReducer
