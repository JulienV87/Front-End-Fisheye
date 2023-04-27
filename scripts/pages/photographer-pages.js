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
  lightboxApp.handleLightBox()
}



//Display Filtered Media


function sortMedia(mediaList) {
  const selectSorting = document.getElementById("sort-media");

  selectSorting.addEventListener('change', () => {

    if (selectSorting.value === 'popularity')
      mediaList.sort((a, b) => b.likes - a.likes);

    else if (selectSorting.value === 'title')

      mediaList.sort((a, b) => {
        const nameA = a.title.toUpperCase()
        const nameB = b.title.toUpperCase()

        if (nameA < nameB)
          return -1;
        if (nameA > nameB)
          return 1;
        return 0;
      });

    else if (selectSorting.value === 'date')
      mediaList.sort(function compare(a, b) {
        if (a.date < b.date)
          return 1;
        if (a.date > b.date)
          return -1;
        return 0;
      });

    displayMedia(mediaList)
  })

}

/////////////



// Fonction qui affichera le nombre total de likes et le prix d'un photographe
function likePrix() {
  
    document.querySelector(".infoPhotographerDisplay").innerHTML =
    `
    <span class="likesInfoPhotographer">
        <p class="likesContainer">460</p><img class="logoLikes" src="../assets/icons/heartB.svg" alt="logo like" />
      </span>
      <p class="info-prix">500 €/jour</p>
    `
  }

likePrix();

////////////


async function init() {

  const id = getPhotographerId()

  const data = await getAllData()

  const { photographerProfile, photographerMedia } = getPhotographerDataById(data, id)

  displayProfile(photographerProfile)
  displayMedia(photographerMedia)
  sortMedia(photographerMedia)
}

init();











