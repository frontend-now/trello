import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import Nav from 'components/Nav'
import BoardsDrawer from '../BoardsDrawer'

const useStyles = createUseStyles({
  main: {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  },
  content: {
    padding: 40,
    overflow: 'scroll',
    minHeight: '90vh'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    content: '""',
    zIndex: -1,
    opacity: 0.6,
    backgroundPosition: () => '50%',
    backgroundColor: ({ background }) => !background && '#2f9f2b',
    backgroundImage: ({ background }) => (background ? `url('${background}')` : null),
    backgroundSize: () => 'cover'
  }
})

function BoardLayout({ boards, activeBoard, children }) {
  const classes = useStyles({ background: activeBoard?.background })
  const [ isBoardDrawerOpen, setIsBoardDrawerOpen ] = useState(false)

  return (
    <div className={classes.main}>
      <span className={classes.backgroundContainer} />
      <Nav setIsBoardDrawerOpen={setIsBoardDrawerOpen} />
      {!activeBoard ? (
        <p align="center">There&apos;s no board with the ID</p>
      ) : (
        <section className={classes.content}>
          {children}
        </section>
      )}
      {isBoardDrawerOpen && (
        <BoardsDrawer boards={boards} setIsBoardDrawerOpen={setIsBoardDrawerOpen} />
      )}
    </div>
  )
}

BoardLayout.propTypes = {
  activeBoard: PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    lists: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    background: PropTypes.string
  }),
  children: PropTypes.node.isRequired
}

BoardLayout.defaultProps = {
  activeBoard: null
}

export default BoardLayout
