const saveImageInLocal = (src: string) => {
  const stories = JSON.parse(localStorage.getItem('stories') || '[]')
  localStorage.setItem('stories',
    JSON.stringify([...stories, { src, seen: false }]))
}

export default saveImageInLocal
