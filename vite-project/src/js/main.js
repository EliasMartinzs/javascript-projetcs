const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
let resultsArray = [];
let favorites = {};
console.log(favorites);

function updateDom() {
  resultsArray.forEach(result => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Fullpage';
    link.target = '_blank';
    // image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA picture of the day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add Favorites';
    saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
    // Card text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // Footer container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyrightResult =
      result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}
async function getPhotosNasa() {
  const count = '10';
  const apiKey = `TjZKGDVK6i9D6QZ613om3X1fJhDCurvutDIb7OWv`;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDom();
  } catch (err) {
    // catch error here
  }
}

// Add to favorites
function saveFavorite(itemUrl) {
  // Looping through results array to select favorite
  resultsArray.forEach(item => {
    if (item.url.includes(itemUrl)) {
      favorites[itemUrl] = item;
      console.log(favorites);
    }
  });
}
getPhotosNasa();
