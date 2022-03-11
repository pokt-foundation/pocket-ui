import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../TextInput/TextInput'
import { useTheme } from '../../theme'
import { GU } from '../../style'
import IconDown from '../../icons/components/IconDown'
import IconSearch from '../../icons/components/IconSearch'
import EscapeOutside from '../EscapeOutside/EscapeOutside'

function Dropdown({
  children,
  handleToggle,
  onClose,
  onChange,
  placeholder,
  value,
  visible,
  ...props
}) {
  const theme = useTheme()

  return (
    <div
      css={`
        position: relative;
      `}
      {...props}
    >
      <TextInput
        value={value}
        wide
        placeholder={placeholder}
        adornment={
          visible ? (
            <IconSearch color={theme.content} />
          ) : (
            <IconDown color={theme.content} />
          )
        }
        adornmentPosition={visible ? 'start' : 'end'}
        onClick={handleToggle}
        onChange={onChange}
        readOnly={!onChange}
        css={`
          padding-left: ${visible ? `${GU * GU}px` : null};
        `}
      />
      <EscapeOutside onEscapeOutside={onClose} useCapture>
        <>
          {visible ? (
            <ul
              css={`
                box-sizing: border-box;
                width: 100%;
                min-height: ${12 * GU}px;
                max-height: ${24 * GU}px;
                overflow-y: scroll;
                overflow-x: hidden;
                padding: 0;
                margin: 0;
                list-style: none;
                background: ${theme.floatingAlternative};
                color: ${theme.content};
                position: absolute;
                z-index: 999;

                &::-webkit-scrollbar {
                  width: ${GU - 3}px;
                }

                &::-webkit-scrollbar-thumb {
                  background-color: ${theme.scrollbar};
                  border-radius: ${GU - 4}px;
                }
              `}
            >
              {children}
            </ul>
          ) : null}
        </>
      </EscapeOutside>
    </div>
  )
}

Dropdown.propTypes = {
  children: PropTypes.node,
  handleToggle: PropTypes.func,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  visible: PropTypes.bool,
}

export default Dropdown
