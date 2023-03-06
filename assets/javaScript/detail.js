import { loadCountry,loadBorders } from "./api.js";


async function init(){
    let country={};
    let borders;

    country=await loadCountry();
    borders=await loadBorders(country.borders);

    displayCountry(country,borders);
}



function displayCountry(country,borders){

    let flag = '';

    flag += `
        <div class="col-12 col-lg">
        <img src="${country.flags.svg}" class="img-fluid" alt="${country.flags.alt}">
    </div>
    <div class="col-1"></div>
    <div class="col-12 col-lg">
        <div class="d-flex align-items-center h-100 mt-4 mt-lg-0 w-100">

            <div class="content w-100" id="contentDetail">
                <h2>${country.name.common}</h2>
                <div class="row gx-5">
                    <div class="col-11 col-xl mt-3">
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
                    <div class="col-1"></div>
                    <div class="col-11 col-xl mt-3">
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

    let allBorder = '';

    for (let border of borders) {
        allBorder += `<a class="btn px-4 mb-1 py-1 me-1 shadow-sm fw-light rounded-1">${border[0].name.common}</a>`;
    }

    document.getElementById('Borders').innerHTML = allBorder;

}




init();