import React, { useEffect, useState } from 'react'
import './story-window.css'
import story from '../../types/story'

interface StoryWindowProps {
  stories: story[]
  index: number
  closeStory: () => void
  sumToIndex: () => void
}

function StoryWindow({ stories, index, closeStory, sumToIndex }: StoryWindowProps) {
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
      if (typeof stories[index + 1] != 'undefined') {
        sumToIndex()
        setBarValue(0)
      }
      else {
        closeStory()
      }
    }
  }, [barValue, stories, index, closeStory, sumToIndex]);

  return (
    <div className='storyWindowContainer'>
      <button className='closeButton' onClick={closeStory}>
        X
      </button>
      <div className='progressBar'>
        {stories.map((_, i: number) => (
          <React.Fragment key={i}>
            <progress
              style={{ width: String(100 / stories.length + "%") }}
              value={i === index ? barValue : 0}
              max="100"
            ></progress>
          </React.Fragment>
        ))}
      </div>
      <img
        className='imageContainer'
        src={stories[index].src}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onTouchStart={() => setIsMouseDown(true)}
        onTouchEnd={() => setIsMouseDown(false)}
      />
    </div>
  )
}

export default StoryWindow

