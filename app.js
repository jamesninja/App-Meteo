
function weather() {
    // console.log(document.getElementById('city').value)  /* afficher la valeur de city avec document.getElementById('city').value */
    const ville=document.getElementById("city").value;
    const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

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

// let URL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY2}`;
let URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&appid=${API_KEY2}`;//7 jours
console.log("URL2 "+URL2)
fetch(URL2) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
// on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
.then(reponse => { 
    if (reponse.status == 200) { // on vérifier que l'appel à l'API a fonctionné
        return reponse.json()  // ne pas oublier le return du callback
    }
    else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
})
.then(donnee => {
    console.log(donnee.current.weather[0].id);
    console.log(donnee);


    let today = new Date();
    let day = today.getDay();
    let ajd = week[day]
    // console.log("dayyyyyyyyyyy "+day);
    // console.log(ajd);

    const meteo = donnee.daily[0].weather[0].id;
    console.log(meteo)

    const jourJ = document.getElementById("previsions")
    let imgSource= "";

    // const monJour = document.getElementById("jour")
    console.log(jourJ) //   a VOIR NAVIGATEUR

    if (meteo >= 200 && meteo <=531){
        //rain = plui 200 =>  531

      imgSource = "./images/rain.svg"    
    }
    if (meteo >= 600 && meteo <=781) {
        imgSource = "./images/snow.svg"   
        //snow = neiger  600 => 622  => 781 
   
    }  
    if (meteo == 800) {
        imgSource = "./images/sun.svg"   
       //sun = soleil  == 800
    }

    if (meteo == 801 || meteo ==802) {
        imgSource = "./images/clouds.svg"   
       //clouds = des nuages  801 => 802 
    }

    if (meteo == 803 || meteo == 804) {
        imgSource = "./images/cloudy.svg"   
     //cloudy = nuageux  803 => 804 
    }
    let ajoutJour = document.createElement("h3")
    let textJour = document.createTextNode(ajd)
    ajoutJour.appendChild(textJour)

    let ajoutImage = document.createElement("img")
    ajoutImage.src = imgSource;
    
    jourJ.appendChild(ajoutJour)
    jourJ.appendChild(ajoutImage)



    // console.log(donnee.main.temp);
    // console.log(donnee.weather[0].description);
    // const positionLat=data.results[0].geometry.lat;
    // const positionLong=data.results[0].geometry.lng;
    // console.log(positionLat);
    // console.log(positionLong);

})
.catch(err => console.log(err))

})
.catch(err => console.log(err))

}

