/* eslint-disable no-inner-declarations */


const lightboxModal = document.getElementById('lightbox_modal');
const mediaLightbox = document.querySelector('.lightbox_center');
const allMediaLightbox = document.getElementsByClassName('media');

const closeBtn = document.querySelector('.lightbox_right .close');

function handleLightBox() {
    const allMediaLightbox = document.getElementsByClassName('media');
    for (let i = 0; i < allMediaLightbox.length; i++) {
      allMediaLightbox[i].addEventListener('click', openLightbox);
    }
  }



function addMediaLightbox(elementClicked) {

    let newMedia = elementClicked.cloneNode(true);
    let newTitle = elementClicked.parentNode.nextSibling.cloneNode(true);

    if (newMedia.tagName === 'VIDEO') {
        newMedia.setAttribute('controls', 'true');
    }

    newMedia.alt = newTitle.textContent;
    newMedia.className = 'media_lightbox';
    newMedia.removeAttribute('onclick');
    newMedia.removeAttribute('lightbox');

    mediaLightbox.appendChild(newMedia);

    mediaLightbox.appendChild(newTitle);

}

// eslint-disable-next-line no-unused-vars
function openLightbox(event) {
    console.log('media cliqué')
    event.target.setAttribute('lightbox', 'true')
    mediaLightbox.innerHTML = "";

    // eslint-disable-next-line no-undef
    main.style.display = 'none';
    // eslint-disable-next-line no-undef
    main.setAttribute('aria-hidden', 'true');
    lightboxModal.style.display = 'block';
    lightboxModal.setAttribute('aria-hidden', 'false');
    addMediaLightbox(event.target);
}


function closeLightbox() {
    // eslint-disable-next-line no-undef
    main.style.display = 'block';
    // eslint-disable-next-line no-undef
    main.setAttribute('aria-hidden', 'false');
    lightboxModal.style.display = 'none';
    lightboxModal.setAttribute('aria-hidden', 'true');
}


function nextMedia() {

    for (let i = 0; i < allMediaLightbox.length; i++) {

        if (allMediaLightbox[i].getAttribute('lightbox') === 'true') {

            let nextMedia;
            let nextTitle;

            mediaLightbox.innerHTML = "";

            if (allMediaLightbox[i + 1]) {

                nextMedia = allMediaLightbox[i + 1].cloneNode(true);
                nextTitle = allMediaLightbox[i + 1].parentNode.nextSibling.cloneNode(true);

                if (nextMedia.tagName === 'VIDEO') {
                    nextMedia.setAttribute('controls', 'true');
                }

                allMediaLightbox[i + 1].setAttribute('lightbox', 'true');

            } else {

                nextMedia = allMediaLightbox[0].cloneNode(true);
                nextTitle = allMediaLightbox[0].parentNode.nextSibling.cloneNode(true);

                if (nextMedia.tagName === 'VIDEO') {
                    nextMedia.setAttribute('controls', 'true');
                }

                allMediaLightbox[0].setAttribute('lightbox', 'true');

            }

            allMediaLightbox[i].removeAttribute('lightbox');

            nextMedia.alt = nextTitle.textContent;
            nextMedia.className = 'media_lightbox';
            nextMedia.removeAttribute('onclick');
            nextMedia.removeAttribute('lightbox');

            mediaLightbox.appendChild(nextMedia);
            mediaLightbox.appendChild(nextTitle);

            break;
        }
    }
}

function previousMedia() {

    for (let i = 0; i < allMediaLightbox.length; i++) {

        if (allMediaLightbox[i].getAttribute('lightbox') === 'true') {

            let previousMedia;
            let previousTitle;

            mediaLightbox.innerHTML = "";

            if (allMediaLightbox[i - 1]) {

                previousMedia = allMediaLightbox[i - 1].cloneNode(true);
                previousTitle = allMediaLightbox[i - 1].parentNode.nextSibling.cloneNode(true);

                if (previousMedia.tagName === 'VIDEO') {
                    previousMedia.setAttribute('controls', 'true');
                }

                allMediaLightbox[i - 1].setAttribute('lightbox', 'true');

            } else {

                previousMedia = allMediaLightbox[allMediaLightbox.length - 1].cloneNode(true);
                previousTitle = allMediaLightbox[allMediaLightbox.length - 1].parentNode.nextSibling.cloneNode(true);

                if (previousMedia.tagName === 'VIDEO') {
                    previousMedia.setAttribute('controls', 'true');
                }

                allMediaLightbox[allMediaLightbox.length - 1].setAttribute('lightbox', 'true');

            }

            allMediaLightbox[i].removeAttribute('lightbox');

            previousMedia.alt = previousTitle.textContent;
            previousMedia.className = 'media_lightbox';
            previousMedia.removeAttribute('onclick');
            previousMedia.removeAttribute('lightbox');

            mediaLightbox.appendChild(previousMedia);
            mediaLightbox.appendChild(previousTitle);

            break;
        }
    }
}


closeBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
    const actualMedia = mediaLightbox.childNodes[0];

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'Escape') {
        closeLightbox();
    }

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'ArrowLeft') {
        previousMedia();
    }

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'ArrowRight') {
        nextMedia();
    }

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'Enter' && actualMedia.tagName === 'VIDEO') {

        if (actualMedia.currentTime < 0.01) {

            actualMedia.play();

        } else if (actualMedia.paused) {

            actualMedia.play();

        } else {
            actualMedia.pause();
        }
    }
})