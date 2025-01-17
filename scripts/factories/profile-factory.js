
//  profile factory
function profilFactory(data) {
    const { name, portrait, city, country, tagline, price } = data
  
    const picture = `assets/photographers/${portrait}`

    //Customize title contact form with name
    const titleContactName = document.querySelector("#modalTitle");
    titleContactName.innerHTML = `Contactez-moi ${name}`


function getUserHeaderDOM() {
    const section = document.createElement('section')
    section.setAttribute('class', 'section-header')
    const info = document.createElement('div')
    const h1 = document.createElement('h1')
    h1.textContent = name
    const h2 = document.createElement('h2')
    h2.setAttribute('class', 'profile_location_h2')
    h2.textContent = `${city}, ${country}`
    const p = document.createElement('p')
    p.setAttribute('class', 'profile_tagline')
    p.textContent = tagline
    const priceInfo = document.createElement('p')
    priceInfo.textContent = `${price}/jours`
    const btn = document.createElement('button')
    btn.setAttribute('class', 'contact_button')
    btn.textContent = 'Contactez moi'
    btn.addEventListener("click",displayModal)

    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    img.setAttribute('class', 'profile-photo')

    section.appendChild(info)
    info.appendChild(h1)
    info.appendChild(h2)
    info.appendChild(p)
    section.appendChild(btn)
    section.appendChild(img)

    return section
  }
  return { getUserHeaderDOM }
}