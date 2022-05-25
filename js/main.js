const getCountries = async () => {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const results = await result.json();
    results.forEach(element => {
        createCard(element)
        
    });
}

getCountries()

