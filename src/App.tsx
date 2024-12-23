import React from 'react';
import './App.css'
import StoryIcon from './components/story-icon/story-icon.tsx'
import StoryWindow from './components/story-window/story-window.tsx';

function App() {
  const stories = localStorage.getItem('stories')
  const [selectedFile, setSelectedFile] = React.useState<string>('');
  const [showImage, setShowImage] = React.useState(false);
  const handleStoryClick = (src: string) => {
    setSelectedFile(src)
    setShowImage(true)
    console.log('click');

  }

  return (
    <>
      {!showImage && (
        <div className='storyContainer'>
          <StoryIcon isNewStory={true} id={-1} storyPhotoSrc='logo.png' />
          {stories && JSON.parse(stories).map((story: string, i: number) =>
            <StoryIcon id={i} isNewStory={false} storyPhotoSrc={story}
              onStoryClick={() => handleStoryClick(story)} />)}
        </div>)}
      {showImage && (
        <StoryWindow src={selectedFile} closeStory={() => setShowImage(false)} />
      )}
    </>
  )
}

export default App
