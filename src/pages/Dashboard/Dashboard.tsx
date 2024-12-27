import React from 'react';
import './Dashboard.css'
import StoryIcon from '../../components/story-icon/story-icon';
import StoryWindow from '../../components/story-window/story-window';
import getImagesInLocal from '../../utils/getImages';
import setStoryAsSeen from '../../utils/setStoryAsSeen';

interface story {
  src: string,
  seen: boolean
}

function Dashboard() {
  const [stories, setStories] = React.useState<story[]>(getImagesInLocal())
  const [selectedFile, setSelectedFile] = React.useState<string>('');
  const [showImage, setShowImage] = React.useState(false);
  const handleStoryClick = (src: string, i: number) => {
    setSelectedFile(src)
    setStoryAsSeen(i)
    setStories(getImagesInLocal())
    setShowImage(true)
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
                onStoryClick={() => handleStoryClick(story.src, i)}
                seen={story.seen} />
            </div>)}
        </div>)}
      {showImage && (
        <StoryWindow src={selectedFile} closeStory={() => setShowImage(false)} />
      )}
    </>
  )
}

export default Dashboard

