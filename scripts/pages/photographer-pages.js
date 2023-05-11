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
  document.querySelector('.info-prix').textContent = photographerProfile.price
  
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
    handleLikesButton()

  })

}

/////////////
//Incrémenter les likes

function handleLikesButton(){
  const addLikesButton = document.querySelectorAll(".media-like-button");

  addLikesButton.forEach((button) => {
    button.addEventListener("click", () => {

      const likes = button.previousElementSibling;

      if (button.dataset.isLiked == 0) {
        likes.textContent = parseInt(likes.textContent) + 1;
        button.style.color = "red";
        button.dataset.isLiked = 1;
      }
      else if (button.dataset.isLiked == 1){ 
        likes.textContent = parseInt(likes.textContent) - 1;
        button.style.color = "#901C1C";
        button.dataset.isLiked = 0;
      }
      
      handleTotalLikes()

    });
  });
}




function handleTotalLikes() {
  let total = 0;
  const likes = document.querySelectorAll(".media-likes");
  likes.forEach((like) => {
    total += parseInt(like.textContent);
   
  });

  document.querySelector(".likesContainer").textContent = total
}



////////////


async function init() {

  const id = getPhotographerId()

  const data = await getAllData()

  const { photographerProfile, photographerMedia } = getPhotographerDataById(data, id)

  displayProfile(photographerProfile)
  displayMedia(photographerMedia)
  sortMedia(photographerMedia)
  handleLikesButton()
  handleTotalLikes()
}

init();











