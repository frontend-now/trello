import { useState } from 'react'

function useHover() {
  const [ isHovering, setIsHovering ] = useState(false)

  return [
    isHovering,
    {
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      onFocus: () => setIsHovering(true),
      onBlur: () => setIsHovering(true)
    }
  ]
}

export default useHover
