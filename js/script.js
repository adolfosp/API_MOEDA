const baseUrl = "https://api.hgbrasil.com/finance?key=b9c37865";

const  
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



function verificaCheck() {
  const campoCheck = document.querySelector(
    'input[name="flexRadioDefault"]:checked'
  );
  return campoCheck.value;
}


  let campos = document.getElementsByClassName('form-control');
  console.log(campos);
  campos[0].addEventListener('click',(e)=>{
         const labelMoeda = document.getElementById('tipoMoeda');
         labelMoeda.innerHTML = verificaCheck();

  });


function moedaKeyUp(dollar, euro, audDollar) {
  moeda.addEventListener("keyup", (e) => {
    e.preventDefault();
    const tipoMoeda = verificaCheck();

    
    switch (tipoMoeda) {
      case "USD":
        real.value = isNaN((moeda.value * dollar).toFixed(2))
          ? "Por favor, insira apenas números"
          : (moeda.value * dollar).toFixed(2) + "≅";
        break;
      case "EUR":
        real.value = isNaN((moeda.value * euro).toFixed(2))
          ? "Por favor, insira apenas números"
          : (moeda.value * euro).toFixed(2) + "≅";
        break;
      case "AUD":
        real.value = isNaN((moeda.value * audDollar).toFixed(2))
          ? "Por favor, insira apenas números"
          : (moeda.value * audDollar).toFixed(2) + "≅";
        break;
    }
  });
}

function realKeyUp(dollar, euro, audDollar) {
  real.addEventListener("keyup", (e) => {
    e.preventDefault();
    const tipoMoeda = verificaCheck();
    switch (tipoMoeda) {
      case "USD":
        moeda.value = isNaN((real.value / dollar).toFixed(2))
          ? "Por favor, insira apenas números"
          : (real.value / dollar).toFixed(2) + "≅";
        break;
      case "EUR":
        moeda.value = isNaN((real.value / euro).toFixed(2))
          ? "Por favor, insira apenas números"
          : (real.value / euro).toFixed(2) + "≅";
        break;
      case "AUD":
        moeda.value = isNaN((real.value / audDollar).toFixed(2))
          ? "Por favor, insira apenas números"
          : (real.value / audDollar).toFixed(2) + "≅";
        break;
    }
  });
}

function pegaValor(data) {
  console.log(data.results.currencies);
  let dollar = Number(data.results.currencies.USD.sell);
  let euro = Number(data.results.currencies.EUR.sell);
  let audDollar = Number(data.results.currencies.AUD.buy);
  moedaKeyUp(dollar, euro, audDollar);
  realKeyUp(dollar, euro, audDollar);
}

(function limparCampo() {
  let campos = document.querySelector('input[name="flexRadioDefault"]:checked');

  campos.addEventListener("click", () => {
    moeda.value = "";
    real.value = "";
  });
})();




window.addEventListener("load", (event) => {
  event.preventDefault();
  requestPokeInfo(baseUrl).then((data) => pegaValor(data));
});
