const searchInput = document.querySelector('#search-input');
const searchFilter = document.querySelector('#filter');
const searchP = document.querySelector('#search-nav__p')


const getCountries = async () => {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const results = await result.json();
    results.forEach(element => {
        createCard(element)   
    });
}

const getCountriesByName = async (event) => {
    searchFilter.value = "";
    searchP.textContent = "";
    const value = event.target.value;
    if(value!=0){
        const result = await fetch(`https://restcountries.com/v3.1/name/${value}`);
        if(result.status === 200){
            const resultJson = await result.json();
            deleteAllCards();
            resultJson.forEach(element => {
            createCard(element);})
        }
        if(result.status === 404){
            searchP.textContent = "El pais que buscas no existe"
            deleteAllCards();
        }
    }
    else{
        deleteAllCards();
        getCountries();
    }  
}

const GetRegion = async (event) => {
    searchInput.value = "";
    if(searchInput.value === ""){
        deleteAllCards()
        getCountries()
    }
    searchP.textContent = "";
    const valueRegion = event.target.value;
    const resultRegion = await fetch(`https://restcountries.com/v3.1/region/${valueRegion}`);
    if(resultRegion.status === 200){
        const resultRegionJson = await resultRegion.json();
        deleteAllCards();
        console.log(searchFilter.value);
        resultRegionJson.forEach(element => {
        createCard(element);})
    }
    if(resultRegion.status === 404){
        console.log('Error de region')
    }
}   

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

function deleteAllCards() {
    const charCard = document.querySelectorAll('.card');
    charCard.forEach(card => card.remove());
}

const debouncedFetch = (input_datos) => {
    setTimeout(() => getCountriesByName(input_datos), 500);
};

searchInput.addEventListener('input', debouncedFetch);
searchFilter.addEventListener("change",GetRegion);
getCountries();

