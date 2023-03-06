

let favouriteList=[];


function drop(){
    favouriteList=JSON.parse(localStorage.getItem('Favourite Countries'));

    const draggable = document.querySelector('.dragging');

    let image = draggable.getElementsByTagName('img')[0];
    let countryName = draggable.getElementsByTagName('h2')[0];

    let country = { flag: image.src, name: countryName.textContent };

    favouriteList.push(country);


    displayFavourites(favouriteList);

    return favouriteList;

}


function onFavouriteChange(callBack){
    let FavouriteBtns=document.querySelectorAll('.FavouriteBtn');


    FavouriteBtns.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            button.classList.toggle('star-color');

            if(button.classList.contains('star-color')){
                let country={flag:button.getAttribute('flag') , name: button.getAttribute('country-name')}
                favouriteList.push(country);
            }
            else{
                favouriteList=favouriteList.filter(item => item !==button.getAttribute('country-name'));
            }
        
            callBack(favouriteList);
        
        })
    })
}



function displayFavourites(favourites){

    favouriteList=favourites;

    let fav = '';
    for (let i = 0; i < favourites.length; i++) {

        fav += `
     <div class="d-flex justify-content-between mt-3">
    <div class="d-flex align-items-center">
    <img class="rounded-3" src="${favourites[i].flag}" width="50" height="30">
    <h2 class="name ms-2 my-0">${favourites[i].name}</h2>
    </div>

    <button country-name="${favourites[i].name}" class="btn cancelBtn bg-light rounded-circle px-2 py-0 m-0 d-block"><i class="fa-solid fa-xmark"></i></button>
    </div>
    `;


    }

    let favList = document.getElementById('FavList');
    favList.innerHTML = fav;


    cancelButtons();


}


function cancelButtons(){
    let btns = document.querySelectorAll('.cancelBtn');


    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            favouriteList = favouriteList.filter(item => item.name !== btn.getAttribute('country-name'));
            localStorage.setItem('Favourite Countries', JSON.stringify(favouriteList));
            displayFavourites(favouriteList);
        })

    })

}

export{drop,displayFavourites,onFavouriteChange};
