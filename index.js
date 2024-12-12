let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let searchinputval = "";
let countryList = [];

function createAndAppend(country) {
    let container = document.createElement("div");
    container.classList.add("d-flex", "flex-row", "mr-auto", "ml-auto", "country-card", "col-11","col-md-5");
    resultCountriesEl.appendChild(container);

    let imageEl = document.createElement("img");
    imageEl.src = country.flag;
    imageEl.classList.add("country-flag");
    container.appendChild(imageEl);

    let namecontainer = document.createElement("div");
    namecontainer.classList.add("ml-4", "d-flex", "flex-column");
    container.appendChild(namecontainer);
    
    let nameEl = document.createElement("p");
    nameEl.textContent = country.name;
    nameEl.classList.add("country-name");
    namecontainer.appendChild(nameEl);
    
    let populationEl = document.createElement("p");
    populationEl.textContent = country.population;
    populationEl.classList.add("country-population");
    namecontainer.appendChild(populationEl);
}

function displaySearchResult() {
    resultCountriesEl.textContent = "";
    for (let country of countryList) {
        let countryName = country.name;

        if (countryName.includes(searchinputval)) {
            createAndAppend(country);
        }




    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");

    fetch(url, options)

        .then(function(response) {
            return response.json();
        })

        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countryList = jsonData;
            displaySearchResult();
        });
}


function onchangesearchinput(event) {
    searchinputval = event.target.value;
    displaySearchResult();


}
getCountries();

searchInputEl.addEventListener("keyup", onchangesearchinput);