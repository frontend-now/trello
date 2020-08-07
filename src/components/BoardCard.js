import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

import { deleteBoard } from 'actions/boardAction'
import useHover from 'hooks/useHover'

const useBoadCardStyles = createUseStyles({
  boardCardWrapper: {
    background: ({ background }) => (background ? `url('${background}')` : '#fff'),
    height: 60,
    color: ({ background }) => (background ? '#fff' : '#000'),
    margin: [ 30, 10 ],
    padding: [ 5, 15 ],
    borderRadius: 5,
    cursor: 'pointer',
    textDecoration: 'none',
    position: 'relative'
  },
  deleteIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 10,
    cursor: 'pointer'
  }
})

function BoardCard({ board }) {
  const classes = useBoadCardStyles({ background: board.background })
  const [ isHovering, hoverProps ] = useHover()
  const dispatch = useDispatch()

  const handleDeleteBoard = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteBoard(board.id))
  }

  return (
    <Link to={`/boards/${board.id}`} {...hoverProps}>
      <div className={classes.boardCardWrapper}>
        <p>{board.title}</p>
        {isHovering && <DeleteIcon className={classes.deleteIcon} onClick={handleDeleteBoard} />}
      </div>
    </Link>
  )
}

BoardCard.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    lists: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    background: PropTypes.string
  }).isRequired
}

export default BoardCard
