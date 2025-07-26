// fetchNasaData();

const nasaApiUrl = 'https://api.nasa.gov/planetary/apod';
const apiKey = 'TqSURpcMofzalKghSjAneOnZRJq5zN7MS4FuJdj3';
const picture = document.querySelector('.dailyImage');
const titleElement = document.querySelector('.title');
const dateElement = document.querySelector('.date');
const explanationElement = document.querySelector('.explanation');
const addToCartButton = document.getElementById('addToCart');
const cartList = document.getElementById('cart-list');

let cart = getCartFromLocalStorage();

// Fetch NASA data
async function fetchNasaData() {
  try {
    const response = await fetch(`${nasaApiUrl}?api_key=${apiKey}&count=1`);
    const data = await response.json();
    const { title, hdurl, date, explanation } = data[0];
    picture.src = hdurl;
    picture.alt = title;
    titleElement.textContent = title;
    dateElement.textContent = date;
    explanationElement.textContent = explanation;
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    displayErrorMessage('Error fetching NASA data');
  }
}

// Add item to cart
function addItemToCart(item) {
  cart.push(item);
  saveCartToLocalStorage(cart);
  renderCartList(cart);
}

// Get cart from local storage
function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart to local storage
function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render cart list
function renderCartList(cart) {
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('LI');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML= '<img src=".\\poubelle.png"/>';
    deleteButton.addEventListener('click', () => removeItemFromCart(index));
    cartItem.innerHTML = `${item.title} - <a href="${item.url}" target="_blank">See</a>`;
    cartItem.appendChild(deleteButton);
    cartList.appendChild(cartItem);
  });
}

// Remove item from cart
function removeItemFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage(cart);
  renderCartList(cart);
}

// Display error message
function displayErrorMessage(message) {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.style.color = 'red';
  document.body.appendChild(errorMessage);
}

// Add event listener to "Add to Cart" button
addToCartButton.addEventListener('click', () => {
  const { title, url } = { title: picture.alt, url: picture.src };
  addItemToCart({ title, url });
});

// Call fetchNasaData function
fetchNasaData();
renderCartList(cart);

//Panier pop up

document.getElementById('openPanier').addEventListener('click', function(e) {
  document.getElementById('modal').style.display = 'block'
})

document.getElementById('modal-close').addEventListener('click', function(e) {
  document.getElementById('modal').style.display = 'none'
})