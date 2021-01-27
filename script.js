const baseUrl = 'https://api.hgbrasil.com/finance?key=b9c37865';

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
  fetch(url)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}





setTimeout(function () {
  console.log(pokemon.results.currencies);

}, 2000);

// Add Events --------------------------------------------
searchButton.addEventListener('click', event => {
  event.preventDefault();
  requestPokeInfo(baseUrl);

});