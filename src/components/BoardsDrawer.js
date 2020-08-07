import React, { useRef } from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import InlineCreate from 'components/InlineCreate'
import useClickOutside from 'hooks/useClickOutside'
import BoardCard from 'components/BoardCard'

const useDrawerStyles = createUseStyles({
  container: {
    position: 'absolute',
    right: 0,
    width: 300,
    bottom: 0,
    background: '#fff',
    top: 40,
    animation: '$slide-from-right 0.3s ease',
    padding: 20,
    backgroundColor: '#000000a3',
    overflow: 'auto',

    '& > p': {
      color: '#fff',
      fontSize: 20
    }
  },

  '@keyframes slide-from-right': {
    '0%': {
      transform: 'translateX(20px)'
    },
    '100%': {
      transform: 'translateX(0px)'
    }
  }
})

function BoardsDrawer({ boards, setIsBoardDrawerOpen }) {
  const classes = useDrawerStyles()
  const boardArray = Object.keys(boards)
  const boardRef = useRef()

  useClickOutside(boardRef, () => setIsBoardDrawerOpen(false))

  return (
    <div ref={boardRef} className={classes.container}>
      <p>Select Board</p>
      {boardArray?.map((id) => <BoardCard key={id} board={boards[id]} />)}
      <InlineCreate variant="board" />
    </div>
  )
}

BoardsDrawer.propTypes = {
  setIsBoardDrawerOpen: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    lists: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    background: PropTypes.string
  })).isRequired
}

export default BoardsDrawer
