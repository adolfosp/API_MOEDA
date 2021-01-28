"use strict";

var baseUrl = "https://api.hgbrasil.com/finance?key=b9c37865"; // Get Elements --------------------------------------------

var searchInput = getElement(".search-input"),
    searchButton = getElement(".search-button"),
    moeda = getElement(".moeda"),
    real = getElement(".real");

function getElement(element) {
  return document.querySelector(element);
}

function requestPokeInfo(url) {
  var response, data;
  return regeneratorRuntime.async(function requestPokeInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function pegaValor(data) {
  console.log(data.results.currencies);
  var dollar = Number(data.results.currencies.USD.sell);
  moeda.value = (dollar / dollar).toFixed(2);
  real.value = dollar.toFixed(2);
  moeda.addEventListener("keyup", function (e) {
    e.preventDefault();
    real.value = (moeda.value * dollar).toFixed(2);
  });
  real.addEventListener("keyup", function (e) {
    e.preventDefault();
    moeda.value = (real.value / dollar).toFixed(2);
  });
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  requestPokeInfo(baseUrl).then(function (data) {
    return pegaValor(data);
  });
});