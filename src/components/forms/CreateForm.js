/* eslint-disable jsx-a11y/no-autofocus */
import { createUseStyles } from 'react-jss'
import { FiX as CrossIcon } from 'react-icons/fi'
import React, { memo } from 'react'
import Textarea from 'react-textarea-autosize'
import PropTypes from 'prop-types'

const useStyles = createUseStyles({
  inputTextArea: {
    border: 'none',
    borderRadius: 5,
    boxShadow: '0px 0px 7px 0px #00000024',
    fontFamily: 'inherit',
    fontSize: 15,
    margin: ({ isList }) => (isList ? 0 : 10),
    marginBottom: () => 10,
    maxWidth: '93%',
    minHeight: 60,
    outline: 'none',
    padding: [ 20, 15 ],
    width: '93%'
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: [ 0, 10 ]
  },
  closeFormButton: {
    cursor: 'pointer'
  },
  formWrapper: {
    maxWidth: 300,
    textAlign: 'center',
    marginBottom: ({ variant }) => variant === 'board' && 10,
    width: '100%',
    minWidth: ({ variant }) => variant === 'list' && 300
  }
})

const FORM_PLACEHOLDERS = {
  list: 'Enter list title',
  card: 'Enter Card title',
  board: 'Enter board title'
}

const CreateForm = ({ isList, text, onChange, closeForm, children, variant }) => {
  const classes = useStyles({ isList, variant })

  return (
    <div className={classes.formWrapper}>
      <div>
        <Textarea
          placeholder={FORM_PLACEHOLDERS[variant]}
          autoFocus
          className={classes.inputTextArea}
          value={text || ''}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className={classes.buttonContainer}>
        {children}
        <CrossIcon onClick={closeForm} className={classes.closeFormButton} size={20} />
      </div>
    </div>
  )
}

CreateForm.propTypes = {
  variant: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  text: PropTypes.string
}

CreateForm.defaultProps = {
  text: ''
}

export default memo(CreateForm)
