import './story-window.css'

interface StoryWindowProps {
  src: string
  closeStory: () => void
}

function StoryWindow({ src, closeStory }: StoryWindowProps) {
  return (
    <div className='storyWindowContainer'>
      <button className='closeButton' onClick={closeStory}>
        X</button>
      <div className='progressBar'></div>
      <img className='imageContainer' src={src} />
    </div>
  )
}

export default StoryWindow
