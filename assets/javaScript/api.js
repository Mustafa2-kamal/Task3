

let activeRequest=0;


async function loadCountries(name){
   

    activeRequest++;

    try {

        let apiURL = (name) ? `https://restcountries.com/v3.1/name/${name}` : 'https://restcountries.com/v3.1/all';
        let response = await fetch(apiURL);


        if (!response.ok) {
            throw Error(response.statusText);
        }

        let currentReq = activeRequest;

        if (currentReq === activeRequest) {
            const countries = await response.json();
            return countries;
        }

    } catch (error) {
        return []
    }

}


async function loadCountry(){
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('countryCode');

   try{
    let response=await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

    if (!response.ok) {
        throw Error(response.statusText);
    }

    let country=await response.json();
    return country[0];

} catch (error) {
    return {}
}
}


async function loadBorders(borders){

    let fetchRequests=[];

   try{

    for(let i=0;i<borders.length;i++){
        const fetchReq = fetch(`https://restcountries.com/v3.1/alpha/${borders[i]}`)
        .then((res) => res.json());
        fetchRequests.push(fetchReq);
    }

    const response = await Promise.all(fetchRequests);
    return response;

} catch (error) {
    return []
}
}



export{loadCountries,loadCountry,loadBorders};