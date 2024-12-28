import React, { useEffect, useRef, useState } from 'react'
import './story-window.css'
import story from '../../types/story'
import setStoryAsSeen from '../../utils/setStoryAsSeen'

interface StoryWindowProps {
  stories: story[]
  index: number
  closeStory: () => void
  sumToIndex: () => void
}

function StoryWindow({ stories, index, closeStory, sumToIndex }: StoryWindowProps) {
  const [barValue, setBarValue] = useState(0)
  const [holding, setHolding] = useState(false)
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPressing = useRef(false);
  const clickTreshold = 100

  const handleMouseDown = () => {
    isPressing.current = true
    pressTimer.current = setTimeout(() => {
      if (isPressing.current) setHolding(true);
    }, clickTreshold);
  };

  const handleMouseUp = () => {
    isPressing.current = false
    if (holding) {
      setHolding(false)
    }
    else {
      setBarValue(100)
    }
  }


  useEffect(() => {
    if (!stories[index].seen) {
      setStoryAsSeen(index)
    }
  }, [index, stories])

  useEffect(() => {
    const interval = setInterval(() => {
      setBarValue((prevValue) => {
        if (holding) {
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
  }, [closeStory, holding])

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
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      />
    </div>
  )
}

export default StoryWindow

