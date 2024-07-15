// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// variables
let cardCount = 0;
let photoData = [];
const likedImagesKey = 'likedImages';
const mydesigns = [1,6,7,8]; // Array of image IDs for my designs

// functions
async function fetchPhotoData() {
  try {
    const response = await fetch('http://127.0.0.1:5000/gallery');
    const data = await response.json();
    photoData = data.map(photo => ({
      id: photo.id,
      url: `http://127.0.0.1:5000${photo.src}`,
      tag: photo.tag
    }));
    // Initialize cards after fetching photo data
    for (let i = 0; i < 10; i++) {
      appendNewCard();
    }
  } catch (error) {
    console.error('Error fetching photo data:', error);
  }
}

async function likeImage(imageId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/like/${imageId}`, {
      method: 'POST'
    });
    if (response.ok) {
      const result = await response.json();
      console.log(`Image ${imageId} liked successfully`, result);
      // Save liked image ID to local storage
      saveLikedImage(imageId);
    } else {
      console.error(`Failed to like image ${imageId}`, response.statusText);
    }
  } catch (error) {
    console.error('Error liking image:', error);
  }
}

function saveLikedImage(imageId) {
  let likedImages = JSON.parse(localStorage.getItem(likedImagesKey)) || [];
  if (!likedImages.includes(imageId)) {
    likedImages.push(imageId);
    localStorage.setItem(likedImagesKey, JSON.stringify(likedImages));
  }
}

function appendNewCard() {
  const photo = photoData[cardCount % photoData.length];
  const card = new Card({
    imageUrl: photo.url,
    id: photo.id,
    tag: photo.tag,
    onDismiss: appendNewCard,
    onLike: (id) => {
      likeImage(id);
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    }
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

async function loadLikedImages() {
  const likedImagesContainer = document.getElementById('liked-images-container');
  let likedImages = JSON.parse(localStorage.getItem(likedImagesKey)) || [];

  for (const imageId of likedImages) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/images/${imageId}`);
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      
      // Apply styles to resize the image to portrait size
      imageElement.style.width = '250px';  // Adjust as needed
      imageElement.style.height = '300px'; // Adjust as needed
      imageElement.style.objectFit = 'cover';
      imageElement.style.margin = '10px';  // Optional, for spacing between images

      likedImagesContainer.appendChild(imageElement);
    } catch (error) {
      console.error(`Error fetching liked image ${imageId}:`, error);
    }
  }
}

async function loadmyImages() {
  const likedImagesContainer = document.getElementById('liked-images-container');

  for (const imageId of mydesigns) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/images/${imageId}`);
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      
      // Apply styles to resize the image to portrait size
      imageElement.style.width = '250px';  // Adjust as needed
      imageElement.style.height = '300px'; // Adjust as needed
      imageElement.style.objectFit = 'cover';
      imageElement.style.margin = '10px';  // Optional, for spacing between images

      likedImagesContainer.appendChild(imageElement);
    } catch (error) {
      console.error(`Error fetching my design image ${imageId}:`, error);
    }
  }
}

async function loadTrendingImages() {
  const trendingImagesContainer = document.getElementById('trending-images-container');
  try {
    const response = await fetch('http://127.0.0.1:5000/gallery/sorted');
    const data = await response.json();
    data.forEach(photo => {
      const imageElement = document.createElement('img');
      imageElement.src = `http://127.0.0.1:5000${photo.src}`;
      
      // Apply styles to resize the image to portrait size
      imageElement.style.width = '250px';  // Adjust as needed
      imageElement.style.height = '300px'; // Adjust as needed
      imageElement.style.objectFit = 'cover';
      imageElement.style.margin = '10px';  // Optional, for spacing between images

      trendingImagesContainer.appendChild(imageElement);
    });
  } catch (error) {
    console.error('Error fetching trending images:', error);
  }
}

// Fetch photo data and initialize cards
fetchPhotoData();

// Load images based on page type
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('liked.html')) {
    loadLikedImages();
  } else if (window.location.pathname.includes('trending.html')) {
    loadTrendingImages();
  } else if (window.location.pathname.includes('mydesigns.html')) {
    loadmyImages();
  }
});
