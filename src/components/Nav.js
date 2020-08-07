import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import { FiAlignRight as NavIcon } from 'react-icons/fi'

const useStyles = createUseStyles({
  nav: {
    backgroundColor: '#00000052',
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
    height: 40,
    padding: [ 10, 0 ],
    textAlign: 'center',
    width: '100vw',
    position: 'relative',

    '& p': {
      margin: 0
    }
  },
  boardOpenIcon: {
    position: 'absolute',
    right: 20,
    cursor: 'pointer',
    top: 10
  }
})

function Nav({ setIsBoardDrawerOpen }) {
  const classes = useStyles()

  return (
    <nav className={classes.nav}>
      <p>Trello</p>
      <NavIcon onClick={setIsBoardDrawerOpen} size={25} className={classes.boardOpenIcon} />
    </nav>
  )
}

Nav.propTypes = {
  setIsBoardDrawerOpen: PropTypes.func.isRequired
}

export default Nav
