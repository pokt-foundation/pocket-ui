import React from 'react'
import PropTypes from 'prop-types'
import { useViewport } from 'use-viewport'
import { Transition, animated } from 'react-spring'
import { cssPx, noop } from '../../utils'
import { useTheme } from '../../theme'
import { springs, GU, RADIUS } from '../../style'
import { IconCross } from '../../icons'
import ButtonIcon from '../Button/ButtonIcon'
import EscapeOutside from '../EscapeOutside/EscapeOutside'
import RootPortal from '../Root/RootPortal'

const SPACE_AROUND = 4 * GU

function Modal({
  children,
  onClose,
  onClosed,
  padding,
  visible,
  width,
  closeButton,
  ...props
}) {
  const theme = useTheme()
  const viewport = useViewport()

  return (
    <RootPortal>
      <Transition
        native
        items={visible}
        from={{ opacity: 0, scale: 0.98 }}
        enter={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 0, scale: 0.98 }}
        config={{ ...springs.smooth, precision: 0.001 }}
        onDestroyed={destroyed => {
          destroyed && onClosed()
        }}
      >
        {show =>
          show &&
          /* eslint-disable react/prop-types */
          (({ opacity, scale }) => (
            <animated.div
              css={`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: ${theme.overlay.alpha(0.9)};
              `}
              style={{ opacity }}
              {...props}
            >
              <animated.div
                css={`
                  position: absolute;
                  z-index: 1;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  display: grid;
                  align-items: center;
                  justify-content: center;
                  overflow: auto;
                `}
                style={{
                  pointerEvents: visible ? 'auto' : 'none',
                  transform: scale.interpolate(v => `scale3d(${v}, ${v}, 1)`),
                }}
              >
                <div
                  css={`
                    padding: ${SPACE_AROUND}px 0;
                  `}
                >
                  <EscapeOutside
                    role="alertdialog"
                    useCapture
                    background={theme.surface}
                    onEscapeOutside={onClose}
                    css={`
                      position: relative;
                      overflow: hidden;
                      min-width: ${360 - SPACE_AROUND * 2}px;
                      background: ${theme.surface};
                      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
                    `}
                    style={{
                      width: cssPx(
                        typeof width === 'function' ? width(viewport) : width
                      ),
                      borderRadius: `${RADIUS}px`,
                    }}
                  >
                    {closeButton && (
                      <ButtonIcon
                        label="Close"
                        onClick={onClose}
                        css={`
                          position: absolute;
                          z-index: 2;
                          top: ${2 * GU}px;
                          right: ${2 * GU}px;
                        `}
                      >
                        <IconCross />
                      </ButtonIcon>
                    )}
                    <div
                      style={{
                        padding: cssPx(
                          typeof padding === 'function'
                            ? padding(viewport)
                            : padding
                        ),
                      }}
                      css={`
                        position: relative;
                        z-index: 1;
                      `}
                    >
                      {children}
                    </div>
                  </EscapeOutside>
                </div>
              </animated.div>
            </animated.div>
          ))
        /* eslint-enable react/prop-types */
        }
      </Transition>
    </RootPortal>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeButton: PropTypes.bool,
  onClose: PropTypes.func,
  onClosed: PropTypes.func,
  padding: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.string,
  ]),
  visible: PropTypes.bool.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.string,
  ]),
}

Modal.defaultProps = {
  closeButton: true,
  onClose: noop,
  onClosed: noop,
  padding: 3 * GU,
  width: viewport => Math.min(viewport.width - SPACE_AROUND * 2, 600),
}

export default Modal
