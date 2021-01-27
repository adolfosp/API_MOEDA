"use strict";

var baseUrl = 'https://api.hgbrasil.com/finance?key=b9c37865'; // Get Elements --------------------------------------------

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
  })["catch"](function (err) {
    return console.log(err);
  });
}

setTimeout(function () {
  console.log(pokemon.results.currencies);
}, 2000); // Add Events --------------------------------------------

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  requestPokeInfo(baseUrl);
});