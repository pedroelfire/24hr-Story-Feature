import React from 'react';
import './story-icon.css'

interface StoryIconProps {
  isNewStory: boolean
  storyPhotoSrc: string
  onStoryClick?: () => void
  id: number

}

function StoryIcon({ isNewStory, storyPhotoSrc, id, onStoryClick }: StoryIconProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.size > 1000000) {
          alert('El archivo es muy grande'); return;
        }
        const src = reader.result as string;
        const stories = localStorage.getItem('stories')
        if (stories) {
          localStorage.setItem('stories', JSON.stringify(
            [...JSON.parse(stories), src]))
        }
        else localStorage.setItem('stories', JSON.stringify([src]))
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <main id={String(id)}>
      <div className='storyItem'>
        {isNewStory ?
          <div>
            <img className="imageNewStory"
              src='plus.png' alt='Subir historia' onClick={handleInputClick} />
            <input type='file' style={{ display: "none" }}
              onChange={() => handleFileChange} ref={fileInputRef} />
          </div>
          :
          <img className="image"
            onClick={onStoryClick}
            src={storyPhotoSrc} />}
      </div>
    </main>
  )
}


export default StoryIcon
