import React from 'react';
import './story-icon.css'

interface StoryIconProps {
  isNewStory: boolean
  storyPhotoSrc: string
  onStoryClick?: () => void
  onUpload?: (src: string) => void
}

function StoryIcon({ isNewStory, storyPhotoSrc,
  onStoryClick, onUpload }: StoryIconProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      alert('Solo se permiten archivos de imagen');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.size > 3000000) {
          alert('El archivo es muy grande'); return;
        }
        const src = reader.result as string;
        const stories = localStorage.getItem('stories')
        if (stories) {
          localStorage.setItem('stories', JSON.stringify(
            [...JSON.parse(stories), src]))
        }
        else localStorage.setItem('stories', JSON.stringify([src]))
        onUpload!(src)
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <main>
      <div className='storyItem'>
        {isNewStory ?
          <div>
            <img className="imageNewStory"
              src='plus.png' alt='Subir historia' onClick={handleInputClick} />
            <input type='file' style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)} ref={fileInputRef}
              accept='image/*, video/*, gif/*' />
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
