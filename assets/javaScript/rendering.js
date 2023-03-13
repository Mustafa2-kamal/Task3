
let countriesContainer = document.getElementById('rowFlags');
let list=document.getElementById('favouriteList');

function displayCountries(countries){
    

    list.innerHTML=`             
    <h2>Favourites</h2>
    <div id="FavList" class="list mt-2 overflow-auto">
    </div>
    `;


    let flags = '';

    if(countries.length == 0){
        countriesContainer.innerHTML = "<p>No Results Found</p>";
        return
    }

    for (let country of countries) {
        flags += `
        <div class="col-12 col-sm-8 col-xxl-4 col-xl-4 col-md-6 col-lg-4 mb-5">

        <div id="${country.cca2}" class="card border-0 shadow-sm draggable" draggable="true">
    
            <a href="./detail.html?countryCode=${country.cca2}" class="text-black text-decoration-none " draggable="false">
                <div class="image shadow-sm" draggable="false">
                    <img src="${country.flags.svg}" class="card-img-top" alt="${country.flags.alt}" draggable="false">
                </div>
                <div class="card-body mt-2 " draggable="false">
                    <h2>${country.name.common}</h2>
                    <div>
                        <span class="name">Population:</span>
                        <span class="value">${country.population.toLocaleString('en-US')}</span>
                    </div>
                    <div>
                        <span class="name">Region:</span>
                        <span class="value">${country.region}</span>
                    </div>
    
                    <div>
                        <span class="name">Capital:</span>
                        <span class="value">${country.capital}</span>
                    </div>
    
                </div>
            </a>
            <div class="text-end d-md-none">
                <Button flag="${country.flags.svg}" country-code="${country.cca2}" class="FavouriteBtn bg-white border-0 me-2 mb-2 ">
                    <i class="fa-solid fa-star"></i>
                </Button>
            </div>
    
        </div>
    
    
    </div>        

        `;

    }

    countriesContainer.innerHTML = flags;

}

export{displayCountries}