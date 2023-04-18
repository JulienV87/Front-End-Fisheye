/* eslint-disable no-inner-declarations */
var lightboxApp = {
    init: function() {
        lightboxApp.initCloseLightbox();
    },
    addMediaLightbox: function(elementClicked) {
        const mediaLightbox = document.querySelector('.lightbox_center');
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
    }
}

lightboxApp.init()