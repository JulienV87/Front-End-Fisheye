    
        async function getPhotographers() {

        const url = "./data/photographers.json";
        const response = await fetch(url)
        const data = await response.json()
        
        const { photographers } = data
        
        return photographers
      }

    function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
