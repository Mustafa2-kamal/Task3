let filterDropMenu=document.getElementsByClassName('dropdown-menu');
let valueSelected=document.getElementById('valueSelected');
let search=document.getElementById('search_input');

let timerId;


function onFilterChange(callBack){
    
    filterDropMenu[0].addEventListener('click',(e)=>{
      valueSelected.innerHTML=e.target.text;
      callBack(e.target.text);
    })

}




function filterCountries(favouritesCodes,countries,filterValue){

    if (filterValue.toLowerCase() === 'no filter') {
        return [...countries];
    }

    else if(filterValue.toLowerCase() === 'favourites'){
        return countries.filter(country => {
            return favouritesCodes.includes(country.cca2)
        })
    }

    return countries.filter(country => {
        return country.region === filterValue
    })
    
}


function onSearch(callBack){
    
    search.addEventListener('input',()=>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            callBack(search.value);
        },300)

    })
}



export{onFilterChange,filterCountries,onSearch}

