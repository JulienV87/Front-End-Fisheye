/* eslint-disable no-inner-declarations */

var lightboxApp = {
    init: function() {
        lightboxApp.initCloseLightbox();
        lightboxApp.initNextAndPreviousMedia();

    },
    initNextAndPreviousMedia: function() {
        const nextMediaLink = document.querySelector("#nextMediaLink");
        const previousMediaLink = document.querySelector("#previousMediaLink");
        if (nextMediaLink) {
            nextMediaLink.addEventListener("click", lightboxApp.nextMedia);
        }
        if (previousMediaLink) {
            previousMediaLink.addEventListener("click", lightboxApp.previousMedia);
        }

    },
    nextMedia: function() { 
        const allMediaLightbox = document.querySelectorAll(".media");
        for (let i = 0; i < allMediaLightbox.length; i++) {
            let mediaContainer = allMediaLightbox[i];
            if (mediaContainer.dataset.selected == 1) {
                let nextMediaIndex = i + 1;
                if (nextMediaIndex == allMediaLightbox.length) {
                    nextMediaIndex = 0;
                }
                let nextMediaContainer = allMediaLightbox[nextMediaIndex];

                console.log(nextMediaContainer)

                lightboxApp.addMediaLightbox(nextMediaContainer);
                break;
            }
        }
    },
    previousMedia: function() { 
        const allMediaLightbox = document.querySelectorAll(".media");
        for (let i = 0; i < allMediaLightbox.length; i++) {
            let mediaContainer = allMediaLightbox[i];
            if (mediaContainer.dataset.selected == 1) {
                let previousMediaIndex = i - 1;
                if (previousMediaIndex == -1) {
                    previousMediaIndex = allMediaLightbox.length -1;
                }
                let previousMediaContainer = allMediaLightbox[previousMediaIndex];

                console.log(previousMediaContainer)

                lightboxApp.addMediaLightbox(previousMediaContainer);
                break;
            }
        }
    },



    addMediaLightbox: function(elementClicked) {
        // vider le contenu precedent/existant
        const allMediaLightbox = document.querySelectorAll(".media");
        allMediaLightbox.forEach(mediaElement => {
            mediaElement.dataset.selected = 0;
        });
        const targetMediaContainer = lightboxApp.getTargetMediaContainer(elementClicked);
        targetMediaContainer.dataset.selected = 1;
        const targetMedia = targetMediaContainer.querySelector(".media-img");
        const mediaLightbox = document.querySelector('.lightbox_center');
        mediaLightbox.innerHTML = null;
        let newMedia = targetMedia.cloneNode(true);
        let newTitle = targetMedia.parentNode.nextSibling.cloneNode(true);  // TODO refactor
    
        if (newMedia.tagName === 'VIDEO') {
            newMedia.setAttribute('controls', 'true');
        }
    
        newMedia.alt = newTitle.textContent;
        newMedia.className = 'media_lightbox';
        newMedia.removeAttribute('onclick');
        newMedia.removeAttribute('lightbox');

        mediaLightbox.appendChild(newMedia);

        mediaLightbox.appendChild(newTitle);
    },
    handleLightBox: function() {
        const allMediaLightbox = document.getElementsByClassName('media');
        for (let i = 0; i < allMediaLightbox.length; i++) {
          allMediaLightbox[i].addEventListener('click', lightboxApp.openLightbox);
        }
    },
    openLightbox: function(event) {
        const mediaLightbox = document.querySelector('.lightbox_center');
        const lightboxModal = document.getElementById('lightbox_modal');
        console.log('media cliqué')
        event.target.setAttribute('lightbox', 'true')
        mediaLightbox.innerHTML = "";
    
        // eslint-disable-next-line no-undef
        main.style.display = 'none';
        // eslint-disable-next-line no-undef
        main.setAttribute('aria-hidden', 'true');
        lightboxModal.style.display = 'block';
        lightboxModal.setAttribute('aria-hidden', 'false');
        lightboxApp.addMediaLightbox(event.target);
    },
    initCloseLightbox: function() {
        const closeBtn = document.querySelector('.lightbox_right .close');
        closeBtn.addEventListener("click", lightboxApp.closeLightbox);
    },
    closeLightbox: function() {
        const lightboxModal = document.getElementById('lightbox_modal');
        // eslint-disable-next-line no-undef
        main.style.display = 'block';
        // eslint-disable-next-line no-undef
        main.setAttribute('aria-hidden', 'false');
        lightboxModal.style.display = 'none';
        lightboxModal.setAttribute('aria-hidden', 'true');
    },
    getTargetMediaContainer: function(element) {
        let targetMedia = element;
        if (targetMedia.classList.contains("media")) {
            return targetMedia;
        } else {
            return lightboxApp.getTargetMediaContainer(targetMedia.parentNode);
        }
    }
}

lightboxApp.init()