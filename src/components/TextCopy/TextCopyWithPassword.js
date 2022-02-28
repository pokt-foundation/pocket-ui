import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import TextInput from '../TextInput/TextInput'
import ButtonIcon from '../Button/ButtonIcon'
import { IconCopy, IconEyeOn, IconEyeOff } from '../../icons'
import { GU, textStyle } from '../../style'
import { useTheme } from '../../theme'
import { noop, warn } from '../../utils'

const HEIGHT = 5 * GU

const TextCopyWithPassword = React.memo(
  React.forwardRef(function TextCopy(
    {
      adornment,
      autofocus,
      message,
      monospace,
      multiline,
      onCopy,
      value,
      ...props
    },
    ref
  ) {
    const theme = useTheme()
    const inputRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false)

    // Allows to focus the component from the outside
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus()
      },
    }))

    // Select the content on focus
    const handleFocus = useCallback(() => {
      inputRef.current && inputRef.current.select()
    }, [])

    // If onCopy is set (either to a function or null), Toast is not used.
    const onCopyOrToast = onCopy === undefined ? noop : onCopy || noop

    const handleCopy = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus()

        try {
          navigator.clipboard.writeText(inputRef.current.innerText)
          onCopyOrToast(message)
        } catch (err) {
          warn(err)
        }
      }
    }, [message, onCopyOrToast])

    const handlePasswordVisibility = useCallback(() => {
      setShowPassword((prevShow) => !prevShow)
    }, [])

    return (
      <div
        css={`
          position: relative;
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          width: ${40 * GU}px;
          height: ${multiline ? HEIGHT + 20 : HEIGHT}px;
          padding-left: ${adornment ? `${HEIGHT}px` : '0'};
          background: ${theme.tableBorder};
        `}
        {...props}
      >
        <TextInput
          ref={inputRef}
          autofocus={autofocus}
          onFocus={handleFocus}
          readOnly
          value={value}
          wide
          type={showPassword ? 'text' : 'password'}
          multiline={showPassword && multiline}
          css={`
            ${showPassword ? `text-overflow: ellipsis;` : null}
            resize: none;
            height: ${HEIGHT}px;
            max-width: 100%;
            border: 0px;
            ${adornment
              ? `
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-left: 0;
                `
              : ''};
            ${textStyle('body4')};
            &:read-only {
              color: ${theme.surfaceContent};
              text-shadow: none;
            }
          `}
        />
        <div
          css={`
            white-space: nowrap;
          `}
        >
          <ButtonIcon
            onClick={handlePasswordVisibility}
            label="show"
            css={`
              width: ${2 * GU}px;
              height: ${2 * GU}px;
              border-radius: 0;
              color: ${theme.accentAlternative};
              margin: ${GU + 2}px;
            `}
          >
            {showPassword ? (
              <IconEyeOff size="small" />
            ) : (
              <IconEyeOn size="small" />
            )}
          </ButtonIcon>
          <ButtonIcon
            onClick={handleCopy}
            label="Copy"
            css={`
              width: ${2 * GU}px;
              height: ${2 * GU}px;
              border-radius: 0;
              color: ${theme.accentAlternative};
              margin-right: ${GU + 4}px;
            `}
          >
            {adornment || <IconCopy size="small" />}
          </ButtonIcon>
        </div>
      </div>
    )
  })
)

TextCopyWithPassword.propTypes = {
  adornment: PropTypes.node,
  autofocus: PropTypes.bool,
  message: PropTypes.string,
  monospace: PropTypes.bool,
  onCopy: PropTypes.func,
  value: PropTypes.string,
  multiline: PropTypes.bool,
}

TextCopyWithPassword.defaultProps = {
  autofocus: false,
  message: 'Copied',
  monospace: true,
  multiline: false,
}

export default TextCopyWithPassword
