import { monospace } from '../utils/font'

const TEXT_STYLES = {
  title1: {
    size: 36,
    weight: 700,
    lineHeight: 1.5,
    fontWeight: 'bold',
  },
  title2: {
    size: 24,
    weight: 700,
    lineHeight: 1.5,
    fontWeight: 'bold',
  },
  title3: {
    size: 18,
    weight: 300,
    lineHeight: 1.5,
    fontWeight: 'bold',
  },
  title4: {
    size: 14,
    weight: 300,
    lineHeight: 1.5,
  },
  body1: {
    size: 18,
    weight: 300,
    lineHeight: 1.5,
  },
  body2: {
    size: 16,
    weight: 300,
    lineHeight: 1.5,
  },
  body3: {
    size: 14,
    weight: 300,
    lineHeight: 1.5,
  },
  body4: {
    size: 12,
    weight: 300,
    lineHeight: 1.5,
  },
  label1: {
    size: 14,
    weight: 400,
    lineHeight: 1.5,
    transform: 'uppercase',
  },
  label2: {
    size: 12,
    weight: 600,
    lineHeight: 1.5,
    transform: 'uppercase',
  },
  label3: {
    size: 10,
    weight: 400,
    lineHeight: 1.5,
    transform: 'uppercase',
  },
  address1: {
    size: 16,
    weight: 400,
    lineHeight: 1.5,
    monospace: true,
  },
  address2: {
    size: 14,
    weight: 400,
    lineHeight: 1.5,
    monospace: true,
  },
}

const STYLES_CSS = {
  size: value => `font-size: ${value}px;`,
  weight: value => `font-weight: ${value};`,
  transform: value => `text-transform: ${value};`,
  lineHeight: value => `line-height: ${value};`,
  fontWeight: value => `font-weight: ${value};`,
  monospace: value => (value ? monospace() : ''),
}

function textStyleToCss(textStyle) {
  return Object.entries(textStyle)
    .map(([name, value]) => STYLES_CSS[name](value))
    .join('')
}

function textStyle(name, includeLineHeight = true) {
  if (!TEXT_STYLES[name]) {
    throw new Error('textStyle(): the text style doesn’t exist: ' + name)
  }

  const style = { ...TEXT_STYLES[name] }

  if (!includeLineHeight) {
    delete style.lineHeight
  }

  return textStyleToCss(style)
}

export { TEXT_STYLES, textStyle }
