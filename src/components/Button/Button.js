import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ButtonBase from '../ButtonBase/ButtonBase'
import { textStyle, GU, RADIUS } from '../../style'
import { useTheme } from '../../theme'
import { warn, unselectable } from '../../utils'

// Base styles related to every size.
// See src/icons/icon-size.js for the corresponding icon sizes.
const SIZE_STYLES = {
  normal: {
    textStyleName: 'body2',
    height: 6 * GU,
    padding: 2 * GU,
    iconPadding: 2 * GU,
    minWidth: 27 * GU,
    middleSpace: 1 * GU,
  },
  medium: {
    textStyleName: 'body3',
    height: 5 * GU,
    padding: 2 * GU,
    iconPadding: 1.5 * GU,
    minWidth: 24 * GU,
    middleSpace: 1 * GU,
  },
  small: {
    textStyleName: 'body3',
    height: 4 * GU,
    padding: 1.5 * GU,
    iconPadding: 1 * GU,
    minWidth: 22 * GU,
    middleSpace: 0.5 * GU,
  },
}

function getPadding(size, displayIcon, displayLabel) {
  const { padding, iconPadding } = SIZE_STYLES[size]

  if (displayIcon && !displayLabel) {
    return '0'
  }

  if (displayIcon && displayLabel) {
    return `0 ${padding}px 0 ${iconPadding}px`
  }

  return `0 ${padding}px`
}

function getWidth(size, displayIconOnly, wide) {
  const { height } = SIZE_STYLES[size]

  if (wide) {
    return '100%'
  }

  if (displayIconOnly) {
    return `${height}px`
  }

  return 'auto'
}

function getMinWidth(size, displayLabelOnly) {
  const { minWidth } = SIZE_STYLES[size]

  return displayLabelOnly ? `${minWidth}px` : '0'
}

// CSS styles related to the current size
function sizeStyles(size, wide, displayIcon, displayLabel) {
  const { height, textStyleName, middleSpace } = SIZE_STYLES[size]

  return {
    height: `${height}px`,
    middleSpace: displayIcon && displayLabel ? `${middleSpace}px` : '0',
    minWidth: getMinWidth(size, !displayIcon && displayLabel),
    padding: getPadding(size, displayIcon, displayLabel),
    textStyleCss: textStyle(textStyleName),
    width: getWidth(size, displayIcon && !displayLabel, wide),
  }
}

// CSS styles related to the current mode
function modeStyles(theme, mode, disabled) {
  if (disabled) {
    return {
      background:
        mode === 'primary' ? theme.disabled : theme.surfaceInteractive,
      border: mode === 'primary' ? '0' : `2px solid ${theme.disabled}`,
      color: theme.disabledContent,
      iconColor: theme.disabledContent,
    }
  }
  if (mode === 'primary') {
    return {
      background: theme.accent,
      border: '0',
      color: theme.contentInverted,
      iconColor: theme.contentInverted,

      activeBackground: 'transparent',
      activeBorder: `2px solid ${theme.accent}`,
      activeColor: theme.surfaceContent,

      hoverBackground: theme.accentHover,
      hoverBorder: '0',
    }
  }

  return {
    background: 'transparent',
    border: `2px solid ${theme.contentBorder}`,
    color: theme.surfaceContent,
    iconColor: theme.surfaceContent,

    activeBorder: `2px solid ${theme.accent}`,

    hoverBorder: `4px solid ${theme.contentBorder}`,
  }
}

function BasicButton({
  children,
  disabled,
  display,
  icon,
  innerRef,
  label,
  mode,
  size,
  wide,
  ...props
}) {
  // prop warnings
  if (display === 'icon' && !icon) {
    warn(`Button: the display "icon" was used without providing an icon.`)
  }
  if (!children && !label) {
    warn('Button: please provide a label.')
  }

  const theme = useTheme()

  if (display === 'auto') {
    display = 'all'
  }

  const displayIcon = icon && (display === 'all' || display === 'icon')
  const displayLabel = label && (display === 'all' || display === 'label')

  // Mode styles
  const {
    background,
    color,
    iconColor,
    border,

    activeBorder,
    activeBackground,
    activeColor,

    hoverBackground,
    hoverBorder,
  } = useMemo(() => modeStyles(theme, mode, disabled), [mode, theme, disabled])

  // Size styles
  const {
    height,
    middleSpace,
    minWidth,
    padding,
    textStyleCss,
    width,
  } = useMemo(() => sizeStyles(size, wide, displayIcon, displayLabel), [
    size,
    wide,
    displayIcon,
    displayLabel,
  ])

  // Use the label as a title when only the icon is displayed
  if (displayIcon && !displayLabel && label && typeof label === 'string') {
    props.title = label
  }

  return (
    <ButtonBase
      ref={innerRef}
      focusRingSpacing={border === '0' ? 0 : 1}
      focusRingRadius={RADIUS}
      disabled={disabled}
      {...props}
      css={`
        display: ${wide ? 'flex' : 'inline-flex'};
        align-items: center;
        justify-content: center;
        width: ${width};
        height: ${height};
        min-width: ${minWidth};
        padding: ${padding};
        ${textStyleCss};
        font-weight: 600;
        ${unselectable};
        background: ${background};
        color: ${color};
        white-space: nowrap;
        border: ${border};
        transition: all 50ms ease-in-out;
        &:hover {
          ${hoverBackground && `background: ${hoverBackground}`};
          ${hoverBorder && `border: ${hoverBorder}`};
        }
        &:active {
          ${activeBackground && `background: ${activeBackground}`};
          ${activeBorder && `border: ${activeBorder}`};
          ${activeColor && `color: ${activeColor}`}
        }
      `}
    >
      {children || (
        <React.Fragment>
          {displayIcon && (
            <span
              css={`
                position: relative;
                top: -1px;
                display: flex;
                color: ${iconColor};
                margin-right: ${middleSpace};
              `}
            >
              {icon}
            </span>
          )}
          {displayLabel && { label }}
        </React.Fragment>
      )}
    </ButtonBase>
  )
}

BasicButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['auto', 'all', 'icon', 'label']),
  icon: PropTypes.node,
  innerRef: PropTypes.any,
  label: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'primary']),
  size: PropTypes.oneOf(['normal', 'medium', 'small']),
  wide: PropTypes.bool,
}

BasicButton.defaultProps = {
  disabled: false,
  display: 'auto',
  mode: 'normal',
  size: 'normal',
  wide: false,
}

const Button = React.forwardRef((props, ref) => (
  <BasicButton innerRef={ref} {...props} />
))

export default Button
