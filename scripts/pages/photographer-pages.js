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

//Display Filtered Media

function getCurrentlyDisplayedMedia() {
  const containerMedia = document.querySelector('.media-container')
  const arrayOfMediaElements = Array.from(containerMedia.querySelectorAll(".media"))
  const arrayOfMediaObjects = arrayOfMediaElements.map(mediaElement => {
    return {
      "id": mediaElement.dataset.id,
      "photographerId": mediaElement.dataset.photographerId,
      "image": mediaElement.dataset.image,
      "video": mediaElement.dataset.video,
      "likes": mediaElement.dataset.likes,
      "date": mediaElement.dataset.date,
      "title": mediaElement.dataset.title
    }
  })
  
  return arrayOfMediaObjects
  
}


const selectSorting = document.getElementById("sort-media");

selectSorting.addEventListener('change', displayMediaSorting);

function displayMediaSorting (getCurrentlyDisplayedMedia) {
  console.log(getCurrentlyDisplayedMedia);

  let sortedLikes = getCurrentlyDisplayedMedia
  console.log(sortedLikes)

  
  //Sorting by comparing the value
  if (selectSorting.value === 'popularity'){
    console.log(selectSorting.value)
    sortedLikes.sort((a,b)=> b.likes - a.likes);
  
    console.log(sortedLikes)
  
  } else if (selectSorting.value === 'title') {

    sortedLikes.sort((a, b)=> {
      const nameA = a.title.toUpperCase()
      const nameB = b.title.toUpperCase()

          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB ) {
              return 1;
          }
              return 0;
      });
      console.log(sortedLikes)

  } else if (selectSorting.value === 'date') {
  
    sortedLikes.sort(function compare(a, b) {
          if (a.date < b.date) {
              return 1;
          }
          if (a.date > b.date ) {
              return -1;
          }
              return 0;
      });
}
}

async function init() {
  
  const id = getPhotographerId()

  const data = await getAllData()

  const { photographerProfile, photographerMedia } = getPhotographerDataById(data, id)

  displayProfile(photographerProfile)
  displayMedia(photographerMedia)
  const currentlyDisplayedMedia = getCurrentlyDisplayedMedia()
  const mediaSorted = displayMediaSorting (currentlyDisplayedMedia)

  
  displayMedia(mediaSorted)
  console.log(mediaSorted)
  
}

init();











