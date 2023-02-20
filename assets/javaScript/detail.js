let Mode=document.getElementById('mode');
let elements=document.getElementsByClassName('elemnt');
let content=document.getElementById('rowDetail');

let ModeToggle=1;


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



function darkMode(){

    document.body.style.backgroundColor="#202c37";
    
    for(let i=0;i<elements.length;i++){
        elements[i].style.cssText="background-color:#2b3945 !important;color:#ffffff !important;";    
    }

    content.style.color='#ffffff';

    Mode.innerHTML="<i class='fa-regular fa-sun'></i> Light Mode";

    localStorage.setItem("Mode","Dark");
}


function lightMode(){

    document.body.style.backgroundColor="#ffffff";
    
    for(let i=0;i<elements.length;i++){
        elements[i].style.cssText="background-color:#ffffff !important;color:#000000 !important;";    
    }

    content.style.color='#000000';

    Mode.innerHTML="<i class='fa-regular fa-moon'></i> Dark Mode";

    localStorage.setItem("Mode","Light");
}




async function display() {
    let contries = await fetch("https://restcountries.com/v3.1/name/Belgium");
    let data = await contries.json();

    console.log(data);

    let flag = '';
    for (let i = 0; i < data.length; i++) {
        formatNumber=Number(data[i].population);

        flag += `
        <div class="col-12 col-lg-5">
        <img src="${data[i].flags.svg}" class="img-fluid" alt="${data[i].flags.alt}">
    </div>
    <div class="col-1"></div>
    <div class="col-12 col-lg-5">
        <div class="d-flex align-items-center h-100 mt-4 mt-lg-0 w-100">

            <div class="content w-100" id="contentDetail">
                <h2>${data[i].name.common}</h2>
                <div class="row gx-5">
                    <div class="col-11 col-xl-6 mt-3">
                        <div class="left_content">
                            <div>
                                <span class="name ">Native Name:</span>
                                <span class="value">${data[i].name.nativeName.nld.common}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Population:</span>
                                <span class="value d-inline-block mt-2">${formatNumber.toLocaleString('en-US')}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Region:</span>
                                <span class="value d-inline-block mt-2">${data[i].region}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Sub Region:</span>
                                <span class="value d-inline-block mt-2">${data[i].subregion}</span>
                            </div>
                            <div>
                                <span class="name d-inline-block mt-2">Capital:</span>
                                <span class="value d-inline-block mt-2">${data[i].capital}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-11 col-xl-6 mt-3">
                        <div class="right_content w-100 ">
                            <div>
                                <span class="name">Top level Domain:</span>
                                <span class="value">.be</span>
                            </div>

                            <div>
                                <span class="name d-inline-block mt-2">Currenies:</span>
                                <span class="value d-inline-block mt-2">${data[i].currencies.EUR.name}</span>
                            </div>

                            <div>
                                <span class="name d-inline-block mt-2">Languages:</span>
                                <span class="value d-inline-block mt-2">${data[i].languages.nld}, ${data[i].languages.fra}, ${data[i].languages.deu}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="down_content mt-5">
                    <span class="fw-bold me-1">Border Countries:</span>
                    <div class="d-inline-block mt-3">
                        <a class="btn bg-white px-4 py-1 me-1 shadow-sm fw-light rounded-1 elemnt">France</a>
                        <a class="btn bg-white px-4 py-1 me-1 shadow-sm fw-light rounded-1 elemnt">Germany</a>
                        <a class="btn bg-white px-4 py-1 shadow-sm fw-light rounded-1 elemnt">Netherlands</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
        `;

    }


    content.innerHTML=flag;
}


 display();
