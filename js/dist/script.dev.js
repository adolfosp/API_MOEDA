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

function verificaCheck() {
  var campoCheck = document.querySelector('input[name="flexRadioDefault"]:checked');
  return campoCheck.value;
}

function moedaKeyUp(dollar, euro, audDollar) {
  moeda.addEventListener("keyup", function (e) {
    e.preventDefault();
    var tipoMoeda = verificaCheck();
    var labelMoeda = document.getElementById('tipoMoeda');

    switch (tipoMoeda) {
      case "USD":
        real.value = isNaN((moeda.value * dollar).toFixed(2)) ? "Por favor, insira apenas números" : (moeda.value * dollar).toFixed(2) + "≅";
        console.log(labelMoeda);
        break;

      case "EUR":
        real.value = isNaN((moeda.value * euro).toFixed(2)) ? "Por favor, insira apenas números" : (moeda.value * euro).toFixed(2) + "≅";
        break;

      case "AUD":
        real.value = isNaN((moeda.value * audDollar).toFixed(2)) ? "Por favor, insira apenas números" : (moeda.value * audDollar).toFixed(2) + "≅";
        break;
    }
  });
}

function realKeyUp(dollar, euro, audDollar) {
  real.addEventListener("keyup", function (e) {
    e.preventDefault();
    var tipoMoeda = verificaCheck();

    switch (tipoMoeda) {
      case "USD":
        moeda.value = isNaN((real.value / dollar).toFixed(2)) ? "Por favor, insira apenas números" : (real.value / dollar).toFixed(2) + "≅";
        break;

      case "EUR":
        moeda.value = isNaN((real.value / euro).toFixed(2)) ? "Por favor, insira apenas números" : (real.value / euro).toFixed(2) + "≅";
        break;

      case "AUD":
        moeda.value = isNaN((real.value / audDollar).toFixed(2)) ? "Por favor, insira apenas números" : (real.value / audDollar).toFixed(2) + "≅";
        break;
    }
  });
}

function pegaValor(data) {
  console.log(data.results.currencies);
  var dollar = Number(data.results.currencies.USD.sell);
  var euro = Number(data.results.currencies.EUR.sell);
  var audDollar = Number(data.results.currencies.AUD.buy);
  moedaKeyUp(dollar, euro, audDollar);
  realKeyUp(dollar, euro, audDollar);
}

(function limparCampo() {
  var campos = document.querySelector('input[name="flexRadioDefault"]:checked');
  campos.addEventListener("click", function () {
    moeda.value = "";
    real.value = "";
  });
})();

window.addEventListener("load", function (event) {
  event.preventDefault();
  requestPokeInfo(baseUrl).then(function (data) {
    return pegaValor(data);
  });
});