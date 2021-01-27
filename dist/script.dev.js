"use strict";

var baseUrl = 'https://api.hgbrasil.com/finance'; // Get Elements --------------------------------------------

var searchInput = getElement('.search-input'),
    searchButton = getElement('.search-button'),
    container = getElement('.pokemon'),
    erroMessage = getElement('.error');
var pokemon;

function getElement(element) {
  return document.querySelector(element);
}

function requestPokeInfo(url) {
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    pokemon = data;
    console.log(pokemon);
  })["catch"](function (err) {
    return console.log(err);
  });
}

console.log(pokemon); // Add Events --------------------------------------------

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  console.log('rtsd');
  requestPokeInfo(baseUrl);
});