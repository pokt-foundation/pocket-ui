import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useInside } from 'use-inside'
import { GU, textStyle } from '../../style'
import { IconQuestion } from '../../icons'
import { useTheme } from '../../theme'
import DiscButton from '../DiscButton/DiscButton'
import Popover from '../Popover/Popover'

function Help({ hint, placement, children, ...props }) {
  const buttonElement = useRef()
  const [visible, setVisible] = useState(false)
  const open = useCallback(() => setVisible(true), [])
  const close = useCallback(() => setVisible(false), [])
  const theme = useTheme()
  const [insideBoxHeading] = useInside('Box:heading')
  const [insideFieldLabel] = useInside('Field:label')

  return (
    <React.Fragment>
      <DiscButton
        ref={buttonElement}
        description={hint}
        onClick={open}
        size={1.5 * GU}
        {...props}
        css={`
          margin-top: ${insideFieldLabel ? -3 : 0}px;
          margin-left: ${insideBoxHeading || insideFieldLabel ? 1 * GU : 0}px;
        `}
      >
        <IconQuestion size="tiny" />
      </DiscButton>
      <Popover
        opener={buttonElement.current}
        visible={visible}
        onClose={close}
        placement={placement}
        css={`
          border: 0;
          ${textStyle('body3')};
          background: white;
          color: ${theme.contentInverted};
        `}
      >
        <div
          css={`
            position: relative;
            max-width: ${48 * GU}px;
            padding: ${2 * GU}px;
          `}
        >
          {children}
        </div>
      </Popover>
    </React.Fragment>
  )
}

Help.propTypes = {
  hint: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(
    ['center'].concat(
      ...['auto', 'top', 'right', 'bottom', 'left'].map((position) => [
        position,
        `${position}-start`,
        `${position}-end`,
      ])
    )
  ),
  children: PropTypes.node.isRequired,
}

export default Help
