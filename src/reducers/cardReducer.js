const initialState = {
  'card-0': {
    text: 'Frontend Task: Make site responsive',
    id: 'card-0',
    list: '0'
  },
  'card-1': {
    text: 'Creative Insights View',
    id: 'card-1',
    list: '0'
  },
  'card-2': {
    text: 'Language Support',
    id: 'card-2',
    list: '1'
  }
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const { text, listID, id } = action.payload

      const newCard = {
        text,
        id: `card-${id}`,
        list: listID
      }

      return { ...state, [`card-${id}`]: newCard }
    }
    case 'EDIT_CARD': {
      const { id, newText } = action.payload
      const card = state[id]
      card.text = newText
      return { ...state, [`card-${id}`]: card }
    }

    case 'DELETE_CARD': {
      const { id } = action.payload
      const newState = state
      delete newState[id]
      return newState
    }
    default:
      return state
  }
}

export default cardsReducer
