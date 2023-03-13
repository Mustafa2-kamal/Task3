



function addFavourite(favourites,country){

    return [...favourites, country];
}

function removeFavourite(favourites,country){

    return favourites.filter(item => item.cca2 !== country.cca2);
}



function displayFavourites(favourites,callBack){

    let favList = document.getElementById('FavList');

    favList.innerHTML = "";

    let fav = '';

    if(favourites.length!==0){

    for (let i = 0; i < favourites.length; i++) {
        // favourites.forEach((country)=>{

        // })

        fav += `
     <div class="d-flex justify-content-between mt-3">
    <div class="d-flex align-items-center">
    <img class="rounded-3" src="${favourites[i].flags.svg}" width="50" height="30">
    <h2 class="name ms-2 my-0">${favourites[i].name.common}</h2>
    </div>

    <button country-code="${favourites[i].cca2}" class="btn cancelBtn bg-light rounded-circle px-2 py-0 m-0 d-block"><i class="fa-solid fa-xmark"></i></button>
    </div>
    `;


    let FavouriteBtns=document.querySelectorAll('.FavouriteBtn');


    FavouriteBtns.forEach((button)=>{

        //button.classList.remove('star-color');
    
        if (button.getAttribute('country-code') === favourites[i].cca2) {
            button.classList.add('star-color');
            console.log(button.getAttribute('country-code'))
            console.log(favourites[i].cca2)
        }

    })



    }


    
    favList.innerHTML = fav;


    let btns = document.querySelectorAll('.cancelBtn');


    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            callBack(btn.getAttribute('country-code'));

        })

    })


}


}





function onAddFavourite(callBack1,callBack2){

    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            draggable.classList.add('drag');
        })

        draggable.addEventListener('dragend', (e) => {
            draggable.classList.remove("drag")
        })
    })

    let favouriteList = document.getElementById('FavList');

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

        const id = e.dataTransfer.getData('text/plain');
        //const draggable = document.getElementById(id);

       console.log(id);

       callBack1(id);

   });

 


   let FavouriteBtns=document.querySelectorAll('.FavouriteBtn');


    FavouriteBtns.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            button.classList.toggle('star-color');

            if(button.classList.contains('star-color')){

               callBack1(button.getAttribute('country-code'));
            }
            else{
                callBack2(button.getAttribute('country-code'));
            }
     
        
        })
    })



}



export{displayFavourites,addFavourite,removeFavourite,onAddFavourite};
