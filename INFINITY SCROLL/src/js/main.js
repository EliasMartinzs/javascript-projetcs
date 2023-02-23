const imageContainer = document.getElementById('image-container');

let photosArray = [];

function displayPhotos() {
  photosArray.forEach(photo => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    console.log(item);
  });
}

// Unplash API
const count = 10;
const apiKey = 'VHXLYBsoYA9-CaUPNoWztLQyPei8ZzkwXKV9oERsVPI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get random photos from Unplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}
getPhotos();
