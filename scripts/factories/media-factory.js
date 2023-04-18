// //  media factory
function mediaFactory(data) {
  const { id, photographerId, title, image, video, date, price, likes } = data;

  let mediaUrl = "";
  let imageOrVideo = "";

  if (image && image != "undefined") {
    mediaUrl = `./assets/sample-photos/${photographerId}/${image}`;
    imageOrVideo = `<img class="media-img" src="${mediaUrl}"/>`;
  } else {
    mediaUrl = `./assets/sample-photos/${photographerId}/${video}`;
    imageOrVideo = `<video class="media-img" controls>
      <source src="${mediaUrl}" type="video/mp4">
    </video>`;
  }
  

  function getUserMediaDOM() {
    
    
    return `<article class="media"
              data-id=${id}
              data-photographer-id=${photographerId}
              data-image=${image}
              data-video=${video}
              data-likes=${likes}
              data-date=${date}
              data-title=${title}
            >
        <div class="media-img-wrapper">
        ${imageOrVideo}
      </div>
      <div class="media-text-wrapper">
        <span class="media-title">${title}</span>
        <span>
          <span class="media-likes">${likes}</span>
          <span class="media-like-button">&hearts;</span>
        </span>
      </div>
      </article>`;
  }

  return { getUserMediaDOM };

}

