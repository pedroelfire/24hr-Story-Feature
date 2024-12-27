const getImagesInLocal = () => {
  const data = localStorage.getItem('stories')
  return data ? JSON.parse(data) : []
};

export default getImagesInLocal;

