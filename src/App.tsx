import React from 'react';
import './App.css'
import StoryIcon from './components/story-icon/story-icon.tsx'
import StoryWindow from './components/story-window/story-window.tsx';

function App() {
  const [stories, setStories] = React.useState<string[]>(
    JSON.parse(localStorage.getItem('stories') || '[]'))

  const [selectedFile, setSelectedFile] = React.useState<string>('');
  const [showImage, setShowImage] = React.useState(false);
  const handleStoryClick = (src: string) => {
    setSelectedFile(src)
    setShowImage(true)
  }
  const handleNewStory = (src: string) => {
    console.log(src, "src")
    setStories([...stories, src])
  }

  return (
    <>
      {!showImage && (
        <div id="story_container" className='storyContainer'>
          <StoryIcon isNewStory={true} storyPhotoSrc='logo.png'
            onUpload={(src) => handleNewStory(src)} />
          {stories && stories.map((story: string, i: number) =>
            <div key={i}>
              <StoryIcon isNewStory={false} storyPhotoSrc={story}
                onStoryClick={() => handleStoryClick(story)} />
            </div>)}
        </div>)}
      {showImage && (
        <StoryWindow src={selectedFile} closeStory={() => setShowImage(false)} />
      )}
    </>
  )
}

export default App
