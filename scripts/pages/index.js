    
        async function getPhotographers() {
        
        const urlApi = "./data/photographers.json";
        const fetchJsonResult = await fetch(urlApi)
        const data = await fetchJsonResult.json()
        
        const { photographers } = data
        
        return {
          photographers,
        }
      }
        
        
    //     fetch(url, {
    //         method: "GET"
    //     })
    //     .then((response) => {
    //         let jsonResponse = response.json()
    //         return jsonResponse;
    //     });
    //     return fetchJsonResult;
    // }

    async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
