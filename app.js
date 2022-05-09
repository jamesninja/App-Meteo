
function weather() {
// console.log(document.getElementById('city').value)  /* afficher la valeur de city avec document.getElementById('city').value */
const ville=document.getElementById("city").value;

const API_KEY = "14a3053403244a73b71868a129b81c1e";
let URL = `https://api.opencagedata.com/geocode/v1/json?q=${ville}&key=${API_KEY}&language=fr&pretty=1`

fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
// on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
.then(response => { 
    if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
        return response.json()  // ne pas oublier le return du callback
    }
    else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
})
.then(data => {
    console.log(data.results[0].geometry);
    const lat=data.results[0].geometry.lat;
    const lon=data.results[0].geometry.lng;
    console.log(lat);
    console.log(lon);

// const API_KEY2 = "d5feee14cc21f117d2a02f17f9c1e44e";
const API_KEY2 = "1cb10dd4fbab0822aeff02f66612e6bd";//ma clé

let URL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY2}`;
console.log(URL2)
fetch(URL2) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
// on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
.then(reponse => { 
    if (reponse.status == 200) { // on vérifier que l'appel à l'API a fonctionné
        return reponse.json()  // ne pas oublier le return du callback
    }
    else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
})
.then(donnee => {
    console.log(donnee.main.temp);
    console.log(donnee.weather[0].description);
    // const positionLat=data.results[0].geometry.lat;
    // const positionLong=data.results[0].geometry.lng;
    // console.log(positionLat);
    // console.log(positionLong);

})
.catch(err => console.log(err))

})
.catch(err => console.log(err))


}

