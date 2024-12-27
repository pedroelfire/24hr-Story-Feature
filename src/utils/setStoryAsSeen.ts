const setStoryAsSeen = (i: number) => {
  const stories = JSON.parse(localStorage.getItem('stories') || '[]')
  stories[i].seen = true
  localStorage.setItem('stories', JSON.stringify(stories))
}

export default setStoryAsSeen
