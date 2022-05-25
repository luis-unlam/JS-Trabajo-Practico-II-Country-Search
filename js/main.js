const searchInput = document.querySelector('#search-input');

const getCountries = async () => {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const results = await result.json();
    results.forEach(element => {
        createCard(element)   
    });
}

const debouncedGetCountries = async (event) => {
    const value = event.target.value;
    const result = await fetch(`https://restcountries.com/v3.1/name/${value}`);
    const results = await result.json();
    deleteAllCards();
    results.forEach(element => {
      createCard(element);
    })
  }

const deleteAllCards = () => {
    const charCard = document.querySelectorAll('.card');
    charCard.forEach(card => card.remove());
  };  

getCountries()

function createCard(element){
    const newCard = document.createElement('div');
    newCard.className = "card";
    newCard.innerHTML = `
    <img src="${element.flags.svg}" class="card-flag">
    <div class="card-content">
        <h3>${element.name.common}</h3>
        <p>Capital: ${element.capital}</p>
        <p>Population: ${element.population}</p>
        <p>Region: ${element.region}</p>
    </div>
    `;
    document.querySelector("#cards-container").appendChild(newCard);
}

let timer = 0;
const debouncedFetch = (values) => {
  clearTimeout(timer);
  timer = setTimeout(() => debouncedGetCountries(values), 500);
};
searchInput.addEventListener('input', debouncedFetch);