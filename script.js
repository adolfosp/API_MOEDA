const baseUrl = 'https://api.hgbrasil.com/finance';

// Get Elements --------------------------------------------
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');

var pokemon;


function getElement(element) {
  return document.querySelector(element);
}

function requestPokeInfo(url) {
  fetch(url )
    .then(response => response.json())
    .then(data => {
      pokemon = data;
      console.log(pokemon);
    })
    .catch(err => console.log(err));
}

console.log(pokemon);





// Add Events --------------------------------------------
searchButton.addEventListener('click', event => {
  event.preventDefault();
  console.log('rtsd');
  requestPokeInfo(baseUrl);


});