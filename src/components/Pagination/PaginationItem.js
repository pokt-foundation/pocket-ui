import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import ButtonBase from '../ButtonBase/ButtonBase'
import { GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'

function PaginationItem({ touchMode, selected, index, onChange }) {
  const theme = useTheme()

  const handleClick = useCallback(() => {
    onChange(index)
  }, [index, onChange])

  return (
    <div>
      <ButtonBase
        onClick={handleClick}
        focusRingRadius={RADIUS}
        disabled={selected}
        css={`
          width: ${(touchMode ? 4 : 3) * GU}px;
          height: ${(touchMode ? 4 : 3) * GU}px;
          color: ${theme.content};
          border-radius: ${RADIUS}px;
          &:active {
            background: ${theme.accentAlternative};
            color: ${theme.contentInverted};
          }

          ${selected &&
            css`
              && {
                background: ${theme.accentAlternative};
                color: ${theme.contentInverted};
              }
            `};
        `}
      >
        <span
          css={`
            position: relative;
            top: 1px;
          `}
        >
          {index + 1}
        </span>
      </ButtonBase>
    </div>
  )
}

PaginationItem.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  touchMode: PropTypes.bool.isRequired,
}

export { PaginationItem }
