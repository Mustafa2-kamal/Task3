let Mode=document.getElementById('mode');
let elements=document.getElementsByClassName('elemnt');
let search=document.getElementById('search_input');
let droplist=document.getElementsByClassName('dropdown-item');
let filterButton=document.getElementById('filter');
let dropMenu=document.getElementsByClassName('dropdown-menu');



let ModeToggle=1;
let nameOfCountry='';
let searchData=[];
let allCountries=[];
let data=[];


//filter by
filterButton.addEventListener('click',()=>{
dropMenu[0].classList.toggle('dropShow');
});

//dropdown 
for(let j=0;j<droplist.length;j++){
    droplist[j].addEventListener('click',(e)=>{
        let region=e.target.text;
        filterButton.innerHTML=`${region}`;
        filterData(region);
    })
}

//Mode dark or light
Mode.addEventListener('click',()=>{

    if (ModeToggle == 1) {//dark
        darkMode();
        ModeToggle = 0;
    }
    else {//light
        lightMode();
        ModeToggle = 1;
    }

});

//search input
search.addEventListener('keyup',function(){
    nameOfCountry=search.value;
    searchByName(nameOfCountry);
});


//filter by region
function filterData(region){

    if (region.toLowerCase() == 'no filter') {

        if (search.value == '') {
            display_Data(allCountries);
        }
        else {
            display_Data(searchData);
        }
    }

    else {
        if (search.value == '') {
            data = allCountries.filter((country) => {
                if (country.region == region) {
                    return country;
                }
            })
        }
        else {
            data = searchData.filter((country) => {
                if (country.region == region) {
                    return country;
                }
            })
        }
        display_Data(data);
    }
}


function darkMode(){

    document.body.style.backgroundColor="#202c37";
    
    for(let i=0;i<elements.length;i++){
        elements[i].style.cssText="background-color:#2b3945 !important;color:#ffffff !important;";    
    }
    
    search.classList.add('search_white');

    for(let i=0;i<droplist.length;i++){
        droplist[i].style.cssText="color:#ffffff !important;";    
    }

    Mode.innerHTML="<i class='fa-regular fa-sun'></i> Light Mode";

    localStorage.setItem("Mode","Dark");
}


function lightMode(){

    document.body.style.backgroundColor="#ffffff";
    
    for(let i=0;i<elements.length;i++){
        elements[i].style.cssText="background-color:#ffffff !important;color:#000000 !important;";    
    }
    
    search.classList.remove('search_white');

    for(let i=0;i<droplist.length;i++){
        droplist[i].style.cssText="color:#000000 !important;";    
    }
    Mode.innerHTML="<i class='fa-regular fa-moon'></i> Dark Mode";

    localStorage.setItem("Mode","Light");
}



//search 
async function searchByName(name){


    if (name == '') {
        displayAll();
    }

    else {

        let contries = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        searchData = await contries.json();

        if (searchData.status != 404) {
            display_Data(searchData);
        }

        else {
            if (ModeToggle == 0) {
                document.getElementById('rowFlags').innerHTML = "<p class='text-white'>No results Found</p>";
            }
            else {
                document.getElementById('rowFlags').innerHTML = "<p class='text-black'>No results Found</p>";
            }
        }
    }

}


//display all countries fetch by api
async function displayAll() {
    let contries = await fetch("https://restcountries.com/v3.1/all");
    allCountries = await contries.json();
    display_Data(allCountries);
}


//to display data
function display_Data(country) {

    let flags = '';
    let ci=0;
    if(country.length!=0){
        for (let i = 0; i < country.length; i++) {
            formatNumber=Number(country[i].population);
            
            flags += `
        <div class="col-12 col-sm-8 col-xxl-3 col-xl-4 col-md-6 col-lg-4">
            <a href="./detail.html" class="text-black text-decoration-none ">
                <div class="card border-0 shadow-sm elemnt">
                    <div class="image shadow-sm">
                        <img src="${country[i].flags.svg}" class="card-img-top" alt="${country[i].flags.alt}">
                    </div>
                    <div class="card-body mt-2 ms-2">
                        <h2>${country[i].name.common}</h2>
                        <div>
                            <span class="name">Population:</span>
                            <span class="value">${formatNumber.toLocaleString('en-US')}</span>
                        </div>
                        <div>
                            <span class="name">Region:</span>
                            <span class="value">${country[i].region}</span>
                        </div>

                        <div>
                            <span class="name">Capital:</span>
                            <span class="value">${country[i].capital}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;

        }

        document.getElementById('rowFlags').innerHTML = flags;
        if (ModeToggle == 0) {
            darkMode();
        }
    }

    else {
        if (ModeToggle == 0) {
            document.getElementById('rowFlags').innerHTML = "<p class='text-white'>No results Found</p>";
        }
        else {
            document.getElementById('rowFlags').innerHTML = "<p class='text-black'>No results Found</p>";
        }
    }

}


displayAll();