import React from 'react'
import useIconSize from '../icon-size'
import IconPropTypes from '../IconPropTypes'

function IconCopy({ size, ...props }) {
  const sizeValue = useIconSize(size);

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.36951 1.30435H12.1956C13.3002 1.30435 14.1956 2.19978 14.1956 3.30435V9.85607"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="1.80432"
        y="5.21738"
        width="8.47826"
        height="8.47826"
        rx="2"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

IconCopy.propTypes = IconPropTypes
export default IconCopy
