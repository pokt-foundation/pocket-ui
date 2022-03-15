import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../theme'
import { GU } from '../../style'
import ButtonBase from '../ButtonBase/ButtonBase'

function DropdownItem({ icon, label, onClick, ...props }) {
  const theme = useTheme()
  return (
    <li
      css={`
        &:hover {
          background-color: ${theme.FloatingAlternativeHover};
        }
      `}
      {...props}
    >
      <ButtonBase
        onClick={onClick}
        label={label}
        css={`
          width: 100%;
          height: ${6 * GU}px;
        `}
      >
        <div
          css={`
            display: flex;
            width: 100%;
            padding: ${2 * GU}px;
            justify-content: left;
            align-items: center;

            &:active,
            &:focus {
              background: ${theme.surfacePressed};
            }
          `}
        >
          {icon && (
            <img
              src={icon}
              alt={label}
              css={`
                width: ${2 * GU}px;
                height: ${2 * GU}px;
              `}
            />
          )}
          <div
            css={`
              flex-grow: 1;
              display: flex;
              align-items: center;
              color: ${theme.content};
              margin-left: ${icon ? 1 * GU : 0}px;
            `}
          >
            {label}
          </div>
        </div>
      </ButtonBase>
    </li>
  )
}

DropdownItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

export default DropdownItem
