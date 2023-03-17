//  photographer factory
function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}`);
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;
    const description = document.createElement("p");
    description.textContent = tagline;
    const priceInfo = document.createElement("span");
    priceInfo.textContent = `${price}€/jours`;

    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(priceInfo);

    return a;
  }
  return { getUserCardDOM };
}

