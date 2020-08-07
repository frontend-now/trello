import { useEffect } from 'react'

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      console.log(ref.current, e.target, 'yo')

      callback()
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  })
}

export default useClickOutside
