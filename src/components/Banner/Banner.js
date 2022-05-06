import React, { useMemo } from 'react'
import { useViewport } from 'use-viewport'
import PropTypes from 'prop-types'
import Spacer from '../Spacer/Spacer'
import { textStyle, GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'
import { IconInfo, IconThickCross } from '../../icons'

function useModeColor(mode) {
  const theme = useTheme()
  const { within } = useViewport()
  const compactMode = within(-1, 'medium')

  if (mode === 'error') {
    return compactMode
      ? `linear-gradient(106.2deg, #3A2020 0%, #262A34 100%)`
      : `linear-gradient(270deg, #1B2331 36.46%, #3F0B0B 100%)`
  }
  if (mode === 'warning') {
    return compactMode
      ? `linear-gradient(106.2deg, #2E2818 0%, #262A34 100%)`
      : `linear-gradient(270deg, ${theme.surface} 36.46%, #816110 100%)`
  }
  if (mode === 'info') {
    return compactMode
      ? `linear-gradient(106.2deg, #243A4F 0%, #262A34 100%)`
      : `linear-gradient(270deg, ${theme.surface} 36.46%, #104A64 100%)`
  }

  return `background: ${theme.surface}`
}

function Banner({ children, mode = 'info', title }) {
  const modeBackground = useModeColor(mode)
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
        grid-template-columns: ${compactMode ? '1fr' : `${12 * GU}px 1fr`};
        padding: ${compactMode ? `${GU * 2}px` : `${3 * GU}px ${4 * GU}px`};
        border-radius: ${RADIUS}px;
      `}
    >
      {!compactMode && (
        <div
          css={`
            width: ${12 * GU}px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            css={`
              background: ${titleColor};
              width: ${4 * GU}px;
              height: ${4 * GU}px;
              border-radius: 50% 50%;
              display: flex;
              justify-content: center;
              align-items: center;
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
}

export default Banner
