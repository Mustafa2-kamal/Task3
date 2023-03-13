
import { loadCountries } from "./api.js";
import { displayFavourites,addFavourite,removeFavourite,onAddFavourite} from "./favourite.js";
import { setInLocalStorage,getFromLocalStorage } from "./storage.js";
import {displayCountries} from "./rendering.js";
import { onFilterChange,filterCountries,onSearch } from "./Filtering.js";

let countries=[];
let filter='no filter';

let favourites =getFromLocalStorage('favourites') || [];


async function init(){
    

    onSearch(async(searchValue)=>{
        countries = await loadCountries(searchValue);
        displayCountries(filterCountries(favourites,countries,filter));

    });

    onFilterChange(filterValue =>{
        filter = filterValue;
        let favouritesCodes = favourites.map(fav => fav.cca2);
        displayCountries(filterCountries(favouritesCodes,countries,filter));
        onAddFavourite(addFavouriteHandler,removeFavouriteHandler);
        displayFavourites(favourites,removeFavouriteHandler);

    });
  


    countries=await loadCountries();
    displayCountries(countries);


    onAddFavourite(addFavouriteHandler,removeFavouriteHandler);


    displayFavourites(favourites,removeFavouriteHandler);
    

}

function addFavouriteHandler(countryCode){

    let droppedCountry=getCountry(countryCode);
    favourites = addFavourite(favourites, droppedCountry);
    favouriteUpdateHandler();

}

function removeFavouriteHandler (countryCode){

    let removedcountry=getCountry(countryCode);
    console.log(removedcountry)
    favourites=removeFavourite(favourites,removedcountry);
    console.log(favourites)
    favouriteUpdateHandler();
}


function getCountry(countryCode){

    return countries.find((country) => {
        return country.cca2 === countryCode
    });

}

function favouriteUpdateHandler(){
    setInLocalStorage('favourites', favourites);
    displayFavourites(favourites, removeFavouriteHandler);
}



init();
