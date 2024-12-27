import { useEffect, useState } from 'react'
import './story-window.css'

interface StoryWindowProps {
  src: string
  closeStory: () => void
}

function StoryWindow({ src, closeStory }: StoryWindowProps) {
  const [barValue, setBarValue] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBarValue((prevValue) => {
        if (isMouseDown) {
          return prevValue
        }
        if (prevValue < 100) {
          return prevValue + .5
        } else {
          return 0
        }
      })
    }, 10)
    return () => clearInterval(interval)
  }, [closeStory, isMouseDown])

  useEffect(() => {
    if (barValue === 100) {
      closeStory();
    }
  }, [barValue, closeStory]);

  return (
    <div className='storyWindowContainer'>
      <button className='closeButton' onClick={closeStory}>
        X</button>
      <progress className='progressBar' value={barValue} max="100"></progress>
      <img className='imageContainer' src={src}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onTouchStart={() => setIsMouseDown(true)}
        onTouchEnd={() => setIsMouseDown(false)} />
    </div>
  )
}

export default StoryWindow
