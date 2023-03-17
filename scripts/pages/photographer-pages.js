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

  return {photographerProfile, photographerMedia}
}

// Display Info Profile
async function displayData(photographerProfile) {

  const headerSection = document.querySelector('.photograph-header')

  const headerModel = profilFactory(photographerProfile)
  const userHeaderDOM = headerModel.getUserHeaderDOM()
  headerSection.appendChild(userHeaderDOM)
}


async function init() {

    const id = getPhotographerId()

    const data = await getAllData()

    const {photographerProfile, photographerMedia} = getPhotographerDataById(data, id)
    displayData(photographerProfile);
};

init();



