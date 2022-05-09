import React, { useMemo } from 'react'
import { useViewport } from 'use-viewport'
import PropTypes from 'prop-types'
import Spacer from '../Spacer/Spacer'
import { textStyle, GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'
import { IconInfo, IconThickCross } from '../../icons'

function useModeColor(mode, withIcon) {
  const theme = useTheme()
  const { within } = useViewport()
  const compactMode = within(-1, 'medium')

  if (mode === 'error') {
    return compactMode
      ? !withIcon
        ? `linear-gradient(123.23deg, #141C24 11.81%, #262A34 98.51%)`
        : `linear-gradient(270.07deg, rgba(27, 35, 49, 0) 0.04%, #1B2331 0.05%, #1B2331 80.37%, #690A0A 98.28%)`
      : `linear-gradient(270deg, #1B2331 36.46%, #3F0B0B 100%)`
  }
  if (mode === 'warning') {
    return compactMode
      ? !withIcon
        ? `linear-gradient(123.23deg, #141C24 11.81%, #262A34 98.51%)`
        : `linear-gradient(90.02deg, #888632 0.02%, #0B1525 15.45%, #0B1525 99.43%)`
      : `linear-gradient(270deg, ${theme.surface} 36.46%, #816110 100%)`
  }
  if (mode === 'info') {
    return compactMode
      ? !withIcon
        ? `linear-gradient(123.23deg, #141C24 11.81%, #262A34 98.51%)`
        : `linear-gradient(89.98deg, #104A64 1.52%, #1B2331 16.38%)`
      : `linear-gradient(270deg, ${theme.surface} 36.46%, #104A64 100%)`
  }

  return `background: ${theme.surface}`
}

function Banner({ children, mode = 'info', title, withIcon = true }) {
  const modeBackground = useModeColor(mode, withIcon)
  const { within } = useViewport()
  const theme = useTheme()

  const titleColor = useMemo(() => {
    if (mode === 'error') {
      return theme.negative
    }

    if (mode === 'info') {
      return theme.accentAlternative
    }

    if (mode === 'warning') {
      return theme.yellow
    }
  }, [mode, theme])

  const modeIcon = useMemo(() => {
    if (mode === 'error') {
      return <IconThickCross size="mini" />
    }

    if (mode === 'info') {
      return <IconInfo size="mini" />
    }

    if (mode === 'warning') {
      return <IconInfo size="mini" />
    }
  }, [mode])

  const compactMode = within(-1, 'medium')

  return (
    <div
      css={`
        width: 100%;
        min-height: ${25 * GU};
        background: ${modeBackground};
        display: grid;
        grid-template-columns: ${!withIcon
          ? '1fr'
          : compactMode
          ? `${3 * GU}px 1fr`
          : `${12 * GU}px 1fr`};
        padding: ${compactMode ? `${GU * 2}px` : `${3 * GU}px ${4 * GU}px`};
        border-radius: ${RADIUS}px;
      `}
    >
      {withIcon && (
        <div
          css={`
            width: ${compactMode ? 2 * GU : 12 * GU}px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: ${compactMode ? 'start' : 'center'};
            margin-top: ${compactMode ? 2 * GU : 0}px;
          `}
        >
          <div
            css={`
              background: ${compactMode ? 'transparent' : titleColor};
              width: ${compactMode ? 2 * GU : 4 * GU}px;
              height: ${compactMode ? 1.5 * GU : 4 * GU}px;
              border-radius: 50% 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              border: ${compactMode && `2px solid ${titleColor}`};

              ${compactMode &&
              `svg {
                color ${titleColor};
                width: ${GU}px;
                height: ${GU}px;
              }`}
            `}
          >
            {modeIcon}
          </div>
        </div>
      )}
      <div
        css={`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <h2
          css={`
            ${textStyle('title3')}
            font-weight: bold;
            color: ${titleColor};
            margin-bottom: ${compactMode ? '0' : '16'}px;
            margin-top: ${compactMode ? '0' : '16'}px;
          `}
        >
          {title}
        </h2>
        <Spacer size={2 * GU} />
        <p
          css={`
            ${textStyle('body3')};
            margin-bottom: ${compactMode ? '0' : '16'}px;
            margin-top: ${compactMode ? '0' : '16'}px;
            color: ${theme.content};
          `}
        >
          {children}
        </p>
      </div>
    </div>
  )
}

Banner.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.string,
  title: PropTypes.string,
  withIcon: PropTypes.bool,
}

export default Banner
