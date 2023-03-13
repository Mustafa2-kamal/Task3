
const storage={};
function setInLocalStorage(key,value){
    try {

        localStorage.setItem(key, JSON.stringify(value));
    
    } catch (error) {
        storage[key]=value;
    }
}

function getFromLocalStorage(key){
    try {

      return JSON.parse(localStorage.getItem(key));

    } catch (error) {
        return storage[key]
    }
}

export{setInLocalStorage,getFromLocalStorage}