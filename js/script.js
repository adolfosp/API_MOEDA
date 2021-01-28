const baseUrl = "https://api.hgbrasil.com/finance?key=b9c37865";

// Get Elements --------------------------------------------
const searchInput = getElement(".search-input"),
  searchButton = getElement(".search-button"),
  moeda = getElement(".moeda"),
  real = getElement(".real");


function getElement(element) {
  return document.querySelector(element);
}

async function requestPokeInfo(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function pegaValor(data) {
  console.log(data.results.currencies);
  let dollar = Number(data.results.currencies.USD.sell);
  moeda.value = (dollar/dollar).toFixed(2);
  real.value = dollar.toFixed(2);

  moeda.addEventListener("keyup", (e) => {
    e.preventDefault();
   real.value = (moeda.value*dollar).toFixed(2);
  });

  real.addEventListener("keyup", (e) => {
    e.preventDefault();
   moeda.value = (real.value/dollar).toFixed(2);
  });

}




window.addEventListener("load", (event) => {
  event.preventDefault();
  requestPokeInfo(baseUrl).then((data) => pegaValor(data));
});
