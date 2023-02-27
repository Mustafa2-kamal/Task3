
async function init(){
    let countries=[];
    let filter='no filter';

    setMode();

    onToggleMode();

    onSearch(async(searchValue,activeRequest)=>{
        countries=await loadCountries(searchValue,activeRequest);
        displayCountries(filterCountries(countries,filter));

    });

    onFilterChange(filterValue =>{
        filter=filterValue;
        let filteredCountries=filterCountries(countries,filterValue);
        displayCountries(filteredCountries);

    });

    countries=await loadCountries();
    displayCountries(countries);

}

function setMode(){

    let Mode = localStorage.getItem('Mode');

    if (Mode === 'dark') {
        toggleMode(Mode);
    }
}

function toggleMode(mode){
    localStorage.setItem('Mode',mode);

    document.body.classList.toggle('dark-theme');
   
    let elements=document.getElementsByClassName('elemnt');

    for(let i=0;i<elements.length;i++){
        elements[i].classList.toggle('dark-theme'); 
    }

}

//Mode dark or light
function onToggleMode(){

    let modeToggle=document.getElementById('mode');
    modeToggle.addEventListener('click',()=>{

    let Mode=localStorage.getItem('Mode');
    if (Mode ==='dark') {//dark
        toggleMode('light');
        modeToggle.innerHTML="<i class='fa-regular fa-moon'></i> Dark Mode";
    }
    else {//light
        toggleMode('dark');
        modeToggle.innerHTML="<i class='fa-regular fa-sun'></i> Light Mode";
    }

})
}

function filterCountries(countries,filterValue){

    if (filterValue.toLowerCase() === 'no filter') {
        return countries;
    }
    else {
        if (countries.length != 0) {
            let filteredCountries = countries.filter(country => {
                return country.region === filterValue
            })

            return filteredCountries;
        }
        else {
            return '';
        }
    }
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
    let activeRequest=0;
    let search=document.getElementById('search_input');
    search.addEventListener('keyup',
    debounce(()=>callBack(search.value,activeRequest++)))
}

async function loadCountries(name,activeRequest){
    let countries='';



    if(name){
        let currentReq=activeRequest;
        countries=await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if(currentReq===activeRequest){
            countries=await countries.json();
            return countries;
        }
    
    }
    else{
        countries=await fetch('https://restcountries.com/v3.1/all');
    }

    countries=await countries.json();

    if(countries.status == 404){
        return '';
    }
    else return countries;

}


function debounce(func, delay = 1000) {
    let timeoutId;
  
    return function () {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  }

function displayCountries(countries){

    let flags = '';

    if (countries.length != 0) {
        for (let i = 0; i < countries.length; i++) {
            flags += `
        <div class="col-12 col-sm-8 col-xxl-3 col-xl-4 col-md-6 col-lg-4">
            <a href="./detail.html?countryCode=${countries[i].cca2}" class="text-black text-decoration-none ">
                <div class="card border-0 shadow-sm elemnt">
                    <div class="image shadow-sm">
                        <img src="${countries[i].flags.svg}" class="card-img-top" alt="${countries[i].flags.alt}">
                    </div>
                    <div class="card-body mt-2 ms-2">
                        <h2>${countries[i].name.common}</h2>
                        <div>
                            <span class="name">Population:</span>
                            <span class="value">${countries[i].population.toLocaleString('en-US')}</span>
                        </div>
                        <div>
                            <span class="name">Region:</span>
                            <span class="value">${countries[i].region}</span>
                        </div>

                        <div>
                            <span class="name">Capital:</span>
                            <span class="value">${countries[i].capital}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;

        }

        document.getElementById('rowFlags').innerHTML = flags;
    }

    else{
        document.getElementById('rowFlags').innerHTML = "<p class='elemnt'>No Results Found</p>";
    }
}


init();
