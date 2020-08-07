/* eslint-disable react/button-has-type */
import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  button: {
    color: '#fff',
    padding: [ 7, 20 ],
    backgroundColor: '#2f9f2b',
    outline: 'none',
    border: 'none',
    borderRadius: 5,
    fontSize: 14,
    cursor: 'pointer',
    position: 'realtive',
    zIndex: 1000,
    transition: 'background-color 0.3s',

    '&:hover': {
      backgroundColor: '#48cc43'
    }
  }
})

function BaseButton({ label, ...others }) {
  const classes = useStyles()

  return (
    <button className={classes.button} {...others}>
      {label}
    </button>
  )
}

BaseButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string
}

BaseButton.defaultProps = {
  type: 'button'
}

export default BaseButton
