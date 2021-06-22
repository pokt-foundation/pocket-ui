import React from 'react'
import PropTypes from 'prop-types'
import ButtonIcon from '../Button/ButtonIcon'
import { IconDown, IconUp } from '../../icons'
import { RADIUS } from '../../style'
import { useTheme } from '../../theme'

function ToggleButton({ onClick, opened }) {
  const theme = useTheme()

  return (
    <ButtonIcon
      label={opened ? 'Close' : 'Open'}
      focusRingRadius={RADIUS}
      onClick={onClick}
      css={`
        display: flex;
        flex-direction: column;
        color: ${theme.surfaceContentSecondary};
        & > div {
          display: flex;
          transform-origin: 50% 50%;
          transition: transform 250ms ease-in-out;
        }
      `}
    >
      <div
        css={`
          transform: rotate3d(${opened ? 1 : 0}, 0, 0, 180deg);
          transform: rotate3d(0, 0, ${opened ? 1 : 0}, 180deg);
        `}
      >
        <IconUp size="small" />
      </div>
      <div
        css={`
          transform: rotate3d(${opened ? -1 : 0}, 0, 0, 180deg);
          transform: rotate3d(0, 0, ${opened ? -1 : 0}, 180deg);
        `}
      >
        <IconDown size="small" />
      </div>
    </ButtonIcon>
  )
}

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
}

export { ToggleButton }
