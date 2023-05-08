/* eslint-disable no-inner-declarations */


// const lightboxModal = document.getElementById('lightbox_modal');
// const mediaLightbox = document.querySelector('.lightbox_center');
// const allMediaLightbox = document.getElementsByClassName('media');

// const closeBtn = document.querySelector('.close');

// function handleLightBox() {
//     const allMediaLightbox = document.getElementsByClassName('media');
//     for (let i = 0; i < allMediaLightbox.length; i++) {
//       allMediaLightbox[i].addEventListener('click', openLightbox);
//     }
//   }



// function addMediaLightbox(elementClicked) {

//     let newMedia = elementClicked.cloneNode(true);
//     let newTitle = elementClicked.parentNode.nextSibling.cloneNode(true);

//     if (newMedia.tagName === 'VIDEO') {
//         newMedia.setAttribute('controls', 'true');
//     }

//     newMedia.alt = newTitle.textContent;
//     newMedia.className = 'media_lightbox';
//     newMedia.removeAttribute('onclick');
//     newMedia.removeAttribute('lightbox');

//     mediaLightbox.appendChild(newMedia);

//     mediaLightbox.appendChild(newTitle);

// }

// eslint-disable-next-line no-unused-vars
// function openLightbox(event) {
//     console.log('media cliqué')
//     event.target.setAttribute('lightbox', 'true')
//     mediaLightbox.innerHTML = "";

//     // eslint-disable-next-line no-undef
//     main.style.display = 'none';
//     // eslint-disable-next-line no-undef
//     main.setAttribute('aria-hidden', 'true');
//     lightboxModal.style.display = 'block';
//     lightboxModal.setAttribute('aria-hidden', 'false');
//     addMediaLightbox(event.target);
// }


// function closeLightbox() {
//     // eslint-disable-next-line no-undef
//     main.style.display = 'block';
//     // eslint-disable-next-line no-undef
//     main.setAttribute('aria-hidden', 'false');
//     lightboxModal.style.display = 'none';
//     lightboxModal.setAttribute('aria-hidden', 'true');
// }


// closeBtn.addEventListener('click', closeLightbox);

// document.addEventListener('keydown', e => {
//     const actualMedia = mediaLightbox.childNodes[0];

//     if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'Escape') {
//         closeLightbox();
//     }

//     if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'ArrowLeft') {
//         previousMedia();
//     }

//     if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'ArrowRight') {
//         nextMedia();
//     }

//     if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'Enter' && actualMedia.tagName === 'VIDEO') {

//         if (actualMedia.currentTime < 0.01) {

//             actualMedia.play();

//         } else if (actualMedia.paused) {

//             actualMedia.play();

//         } else {
//             actualMedia.pause();
//         }
//     }
// })