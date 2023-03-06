
import { loadCountries } from "./api.js";
import { drop,displayFavourites,onFavouriteChange} from "./favourite.js";


async function init(){
    let countries=[];
    let filter='no filter';

    let FavouriteCountries=[];

    try {
        FavouriteCountries= JSON.parse(localStorage.getItem('Favourite Countries'));
        if(FavouriteCountries===null){
        FavouriteCountries=[];
        }
    }
    catch {
        FavouriteCountries=[];
    }


    onSearch(async(searchValue)=>{
        countries=await loadCountries(searchValue);
        displayCountries(filterCountries(countries,filter));

    });

    onFilterChange(filterValue =>{
        filter=filterValue;
        displayCountries(filterCountries(countries,filterValue));

    });

    countries=await loadCountries();
    displayCountries(countries);


    onFavouriteChange((FavouriteList)=>{
        try {
            localStorage.setItem('Favourite Countries', JSON.stringify(FavouriteList));
        }
        catch {
            // handle error, usually to keep it in memory (variable)
        }

    });

    onDrag((favourites)=>{
        try {
            FavouriteCountries=favourites;
            localStorage.setItem('Favourite Countries', JSON.stringify(FavouriteCountries));
        }
        catch {
            // handle error, usually to keep it in memory (variable)
        }

    });

    console.log(FavouriteCountries);

    displayFavourites(FavouriteCountries);

}


function filterCountries(countries,filterValue){

    if (filterValue.toLowerCase() === 'no filter') {
        return [...countries];
    }

    return countries.filter(country => {
        return country.region === filterValue
    })
    
}

function onFilterChange(callBack){
    let dropMenu=document.getElementsByClassName('dropdown-menu');
    let valueSelected=document.getElementById('valueSelected');
    
    dropMenu[0].addEventListener('click',(e)=>{
      valueSelected.innerHTML=e.target.text;
      callBack(e.target.text);
    })
}

function onSearch(callBack){
    let search=document.getElementById('search_input');
    search.addEventListener('keyup',
    debounce(()=>callBack(search.value)))
}


function debounce(func, delay = 300) {
    let timerId;
  
    return function () {
      clearTimeout(timerId);
  
      timerId = setTimeout(() => {
        func();
      }, delay);
    };
  }



function onDrag(callBack){

    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            draggable.classList.add('drag');
        })

        draggable.addEventListener('dragend', () => {
           draggable.classList.remove('dragging');
            draggable.classList.remove("drag")
        })
    })


    let favouriteList = document.getElementById('favouriteList');

    favouriteList.addEventListener('dragenter', (e) => {
        e.preventDefault();
        favouriteList.classList.add('drag-over');
    });

    favouriteList.addEventListener('dragover', (e) => {
        e.preventDefault();
        favouriteList.classList.add('drag-over');
    });

    favouriteList.addEventListener('dragleave', (e) => {
        favouriteList.classList.remove('drag-over');
    });

    favouriteList.addEventListener('drop', (e) => {
        e.preventDefault();
        favouriteList.classList.remove('drag-over');

        let list = drop();
        callBack(list);

   });

   

}

function displayCountries(countries){

    let flags = '';


    if(countries.length == 0){
        document.getElementById('rowFlags').innerHTML = "<p>No Results Found</p>";
        return
    }

    for (let country of countries) {
        flags += `
        <div class="col-12 col-sm-8 col-xxl-3 col-xl-4 col-md-6 col-lg-4 ">

        <div class="card border-0 shadow-sm draggable" draggable="true">
    
            <a href="./detail.html?countryCode=${country.cca2}" class="text-black text-decoration-none ">
                <div class="image shadow-sm">
                    <img src="${country.flags.svg}" class="card-img-top" alt="${country.flags.alt}">
                </div>
                <div class="card-body mt-2 ">
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
                <Button flag="${country.flags.svg}" country-name="${country.name.common}" class="FavouriteBtn bg-white border-0 me-2 mb-2 ">
                    <i class="fa-solid fa-star"></i>
                </Button>
            </div>
    
        </div>
    
    
    </div>        

        `;

    }

    document.getElementById('rowFlags').innerHTML = flags;

}


init();
