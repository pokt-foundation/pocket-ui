import React from 'react'
import PropTypes from 'prop-types'
import { GU } from '../../style'
import ButtonBase from '../ButtonBase/ButtonBase'

function ButtonIcon({ label, children, ...props }) {
  return (
    <ButtonBase
      title={label}
      css={`
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: ${4 * GU}px;
        height: ${4 * GU}px;
        &:active {
          background: rgba(220, 234, 239, 0.3);
        }
      `}
      {...props}
    >
      {children}
    </ButtonBase>
  )
}

ButtonIcon.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default ButtonIcon
