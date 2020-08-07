import { v4 as uuidv4 } from 'uuid'

const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random'

const setActiveBoard = (id) => ({
  type: 'SET_ACTIVE_BOARD',
  payload: id
})

const addBoardWithBackGround = (title, background) => ({
  type: 'ADD_BOARD',
  payload: { title, id: uuidv4(), background }
})

const addBoardWithoutBackGround = (title) => ({
  type: 'ADD_BOARD',
  payload: { title, id: uuidv4() }
})

const addBoard = (title) => async (dispatch) => {
  try {
    const randomImage = await fetch(UNSPLASH_API_URL, {
      headers: new Headers({
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
      })
    })

    const { urls: { regular } = {} } = await randomImage.json()

    dispatch(addBoardWithBackGround(title, regular))
  } catch (error) {
    dispatch(addBoardWithoutBackGround(title))
  }
}

const renameBoard = (title, id) => ({
  type: 'RENAME_BOARD',
  payload: { title, id }
})

const deleteBoard = (id) => ({
  type: 'DELETE_BOARD',
  payload: { id }
})

export { setActiveBoard, addBoard, renameBoard, deleteBoard }
