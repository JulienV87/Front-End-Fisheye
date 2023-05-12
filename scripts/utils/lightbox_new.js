/* eslint-disable no-inner-declarations */

var lightboxApp = {
    init: function() {
        lightboxApp.initCloseLightbox();
        lightboxApp.initNextAndPreviousMedia();
        lightboxApp.addMediaTitle();
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

                lightboxApp.addMediaLightbox(nextMediaContainer);
                break;
            }
        }
    },
    previousMedia: function() { 
        const allMediaLightbox = document.querySelectorAll(".media");
        console.log(allMediaLightbox)
        for (let i = 0; i < allMediaLightbox.length; i++) {
            let mediaContainer = allMediaLightbox[i];
            if (mediaContainer.dataset.selected == 1) {
                let previousMediaIndex = i - 1;
                if (previousMediaIndex == -1) {
                    previousMediaIndex = allMediaLightbox.length -1;
                }
                let previousMediaContainer = allMediaLightbox[previousMediaIndex];

                lightboxApp.addMediaLightbox(previousMediaContainer);
                break;
            }
        }
    },
    addMediaTitle: function() {
        const allMediaLightbox = document.querySelectorAll(".media-img-wrapper");
        for (let i = 0; i < allMediaLightbox.length; i++) {
            let mediaContainer = allMediaLightbox[i];
            if (mediaContainer.dataset.selected == 1) {
                let mediaTitle = mediaContainer.querySelector(".media-title");
                let mediaTitleContainer = mediaTitle.parentNode;
                lightboxApp.addMediaLightbox(mediaTitleContainer);
                break;
            }
        }
    },
    addMediaLightbox: function(elementClicked) {
        const modalContainer = document.querySelector('#lightbox_modal');
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
        const mediaTitleContainer = modalContainer.querySelector('.display-title');

        mediaTitleContainer.innerText = targetMediaContainer.dataset.title;
    
        if (newMedia.tagName === 'VIDEO') {
            newMedia.setAttribute('controls', 'true');
        }
    
        newMedia.alt = targetMediaContainer.dataset.title;
        newMedia.className = 'media_lightbox';
        newMedia.removeAttribute('onclick');
        newMedia.removeAttribute('lightbox');

        mediaLightbox.appendChild(newMedia);

    },
    handleLightBox: function() {
        const allMediaLightbox = document.getElementsByClassName('media-img-wrapper');
        for (let i = 0; i < allMediaLightbox.length; i++) {
          allMediaLightbox[i].addEventListener('click', lightboxApp.handleMediaClick);
        }

        document.addEventListener('keydown', (event) => {
            const activeElement = document.activeElement

            console.log(activeElement)
          
            if(event.key == 'Enter'  && (activeElement.tagName == 'IMG' || activeElement.tagName == 'VIDEO')) {
              // ouvrir la lightbox
              lightboxApp.openLightbox(activeElement)
            }
          }) 
    },

    handleMediaClick: function(event) {
        lightboxApp.openLightbox(event.target)
    },


    openLightbox: function(element) {
        const mediaLightbox = document.querySelector('.lightbox_center');
        const lightboxModal = document.getElementById('lightbox_modal');
        element.setAttribute('lightbox', 'true')
        mediaLightbox.innerHTML = "";
    
        // eslint-disable-next-line no-undef
        main.style.display = 'none';
        // eslint-disable-next-line no-undef
        // main.setAttribute('aria-hidden', 'true');  TODO peut etre serve a rien, a supprimer ?
        lightboxModal.style.display = 'block';
        lightboxModal.setAttribute('aria-hidden', 'false');
        lightboxApp.addMediaLightbox(element);
    },
    initCloseLightbox: function() {
        const closeBtn = document.querySelector('.lightbox_right .close');
        closeBtn.addEventListener("click", lightboxApp.closeLightbox);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                lightboxApp.closeLightbox();
            } else if (event.key === 'ArrowRight') {
                lightboxApp.nextMedia();
            } else if (event.key === 'ArrowLeft') {
                lightboxApp.previousMedia();
            }
        });
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