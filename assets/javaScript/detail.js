
async function init(){
    let country='';

    setMode();

    onToggleMode();

    country=await loadCountry();
    displayCountry(country);
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

async function loadCountry(){
    let urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    let code = urlParams.get('countryCode');
    console.log(code);

    let country=await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    country=await country.json();
    return country[0];
}

function displayCountry(country){

    let flag = '';

    flag += `
        <div class="col-12 col-lg-5">
        <img src="${country.flags.svg}" class="img-fluid" alt="${country.flags.alt}">
    </div>
    <div class="col-1"></div>
    <div class="col-12 col-lg-5">
        <div class="d-flex align-items-center h-100 mt-4 mt-lg-0 w-100">

            <div class="content w-100" id="contentDetail">
                <h2>${country.name.common}</h2>
                <div class="row gx-5">
                    <div class="col-11 col-xl-6 mt-3">
                        <div class="left_content">
                            <div>
                                <span class="name ">Native Name:</span>
                                <span class="value">${Object.values(country.name.nativeName)[0].common}</span>

                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Population:</span>
                                <span class="value d-inline-block mt-2">${country.population.toLocaleString('en-US')}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Region:</span>
                                <span class="value d-inline-block mt-2">${country.region}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Sub Region:</span>
                                <span class="value d-inline-block mt-2">${country.subregion}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Capital:</span>
                                <span class="value d-inline-block mt-2">${country.capital}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-11 col-xl-6 mt-3">
                        <div class="right_content w-100 ">
                            <div>
                                <span class="name">Top level Domain:</span>
                                <span class="value">${country.tld}</span>
                            </div>

                            <div>
                                <span class="name d-inline-block mt-2">Currenies:</span>
                                <span class="value d-inline-block mt-2">${Object.values(country.currencies)[0].name}</span>
                            </div>

                            <div>
                                <span class="name d-inline-block mt-2">Languages:</span>
                                <span class="value d-inline-block mt-2">${Object.values(country.languages).join(', ')}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="down_content mt-5">
                    <span class="fw-bold me-1">Border Countries:</span>
                    <div class="d-block d-md-inline mt-3" id="Borders">

                    </div>
                </div>

            </div>
        </div>
    </div>
        `;


    document.getElementById('rowDetail').innerHTML = flag;

    let borders = '';

    for (let border of country.borders) {
        borders += `<a class="btn bg-white px-4 mt-1 py-1 me-1 shadow-sm fw-light rounded-1 elemnt">${border}</a>`;
    }

    document.getElementById('Borders').innerHTML = borders;

}

init();