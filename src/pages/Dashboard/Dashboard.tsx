import React from 'react';
import './Dashboard.css'
import StoryIcon from '../../components/story-icon/story-icon';
import StoryWindow from '../../components/story-window/story-window';
import getImagesInLocal from '../../utils/getImages';
import story from '../../types/story';

function Dashboard() {
  const [stories, setStories] = React.useState<story[]>(getImagesInLocal())
  const [selectedFile, setSelectedFile] = React.useState<number>(0);
  const [showImage, setShowImage] = React.useState(false);
  const handleStoryClick = (i: number) => {
    setSelectedFile(i)
    setShowImage(true)
  }
  const closeStoryWindow = () => {
    setStories(getImagesInLocal())
    setShowImage(false)
  }

  return (
    <>
      {!showImage && (
        <div id="story_container" className='storyContainer'>
          <StoryIcon isNewStory={true} seen={false} storyPhotoSrc='logo.png'
            onUpload={() => setStories(getImagesInLocal())} />
          {stories && stories.map((story,
            i: number) =>
            <div key={i}>
              <StoryIcon isNewStory={false} storyPhotoSrc={story.src}
                onStoryClick={() => handleStoryClick(i)}
                seen={story.seen} />
            </div>)}
        </div>)}
      {showImage && (
        <StoryWindow stories={stories}
          index={selectedFile}
          sumToIndex={() => setSelectedFile(selectedFile + 1)}
          closeStory={closeStoryWindow} />
      )}
    </>
  )
}

export default Dashboard
