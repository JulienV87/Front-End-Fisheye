async function getAllData() {
  const url = "./data/photographers.json";
  const response = await fetch(url)
  const data = await response.json()
  return data
}

function getPhotographerId() {

  const urlSearchParams = new URLSearchParams(window.location.search)

  const id = urlSearchParams.get('id')

  return id
}

function getPhotographerDataById(data, id) {

  const photographers = data.photographers

  const media = data.media

  const photographerProfile = photographers.find(p => p.id == id)

  const photographerMedia = media.filter(m => m.photographerId == id)
  console.log(photographerMedia);

  return { photographerProfile, photographerMedia }
}

// Display Info Profile
function displayProfile(photographerProfile) {

  const headerSection = document.querySelector('.photograph-header')

  const headerModel = profilFactory(photographerProfile)
  const userHeaderDOM = headerModel.getUserHeaderDOM()
  headerSection.appendChild(userHeaderDOM)
}

//Display Media

function displayMedia(photographerMedia) {
  
  const containerMedia = document.querySelector('.media-container')
  let template = ""
  photographerMedia.forEach(media => {
    
    const mediaModel = mediaFactory(media)
    
    const mediaDOM = mediaModel.getUserMediaDOM()
    
    template += mediaDOM
  
  });
  
  containerMedia.innerHTML = template
}

function getCurrentlyDisplayedMedia() {
  const containerMedia = document.querySelector('.media-container')
  const listOfMedias = containerMedia.querySelectorAll(".media")
  console.log(listOfMedias)
}

async function init() {

  const id = getPhotographerId()

  const data = await getAllData()

  const { photographerProfile, photographerMedia } = getPhotographerDataById(data, id)

  displayProfile(photographerProfile)
  displayMedia(photographerMedia)
  getCurrentlyDisplayedMedia()
}

init();











