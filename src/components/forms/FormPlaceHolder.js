import { createUseStyles } from 'react-jss'
import { FiPlus as AddIcon } from 'react-icons/fi'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = createUseStyles({
  container: {
    alignItems: 'center',
    backgroundColor: ({ isList }) => (isList ? 'rgba(0,0,0,.15)' : 'inherit'),
    borderRadius: 5,
    color: ({ isList }) => (isList ? 'white' : 'inherit'),
    cursor: 'pointer',
    display: 'flex',
    height: 35,
    opacity: ({ isList }) => (isList ? 1 : 0.5),
    padding: [ 20, 10 ],
    minWidth: ({ isList }) => (isList ? 300 : 'auto'),

    '& p': {
      flexShrink: 0,
      margin: 0
    },

    '& > *': {
      marginRight: 5
    }
  }
})

const FormPlaceHolder = ({ isList, children, onClick }) => {
  const classes = useStyles({ isList })

  return (
    <div className={classes.container} role="button" tabIndex={0} onKeyPress={onClick} onClick={onClick}>
      <AddIcon width={25} />
      <p>{children}</p>
    </div>
  )
}

FormPlaceHolder.propTypes = {
  isList: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

FormPlaceHolder.defaultProps = {
  isList: false
}

export default FormPlaceHolder
