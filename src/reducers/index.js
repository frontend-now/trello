import { combineReducers } from 'redux'

import listsReducer from './listReducer'
import cardsReducer from './cardReducer'
import boardsReducer from './boardsReducer'
import activeBoardReducer from './activeBoardReducer'

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  activeBoard: activeBoardReducer
})
