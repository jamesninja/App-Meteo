



   const week = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // function chooseDay() {
    //     let number = document.getElementById("jour-select").value;
    //         return(number)
    //   }



// définition de la fonction qui gere l'affichage ddes jours
function displayWeatherDay(idMeteo, day) { // meteo correspond à l'id (par ex 300 ou 804 etc...)
    
    const eltPrevisions = document.getElementById("previsions")
    let imgSource= "";
    // const monJour = document.getElementById("jour")
    // console.log(eltPrevisions) //   a VOIR NAVIGATEUR

    if (idMeteo >= 200 && idMeteo <=531) {
       //rain = plui 200 =>  531
        imgSource = "./images/rain.svg"    
    }
    if (idMeteo >= 600 && idMeteo <=781) {
        imgSource = "./images/snow.svg"   
        //snow = neiger  600 => 622  => 781 
    }  
    if (idMeteo == 800) {
        imgSource = "./images/sun.svg"   
        //sun = soleil  == 800
    }
    if (idMeteo == 801 || idMeteo ==802) {
        imgSource = "./images/clouds.svg"   
        //clouds = des nuages  801 => 802 
    }
    if (idMeteo == 803 || idMeteo == 804) {
        imgSource = "./images/cloudy.svg"   
        //cloudy = nuageux  803 => 804 
    }
    let ajoutDiv = document.createElement("div")
    ajoutDiv.classList = "leJour"
    let ajoutNomJour = document.createElement("h3")
    let textJour = document.createTextNode(day)
    ajoutNomJour.appendChild(textJour)
    
    let ajoutImage = document.createElement("img")
    ajoutImage.src = imgSource;
    ajoutDiv.appendChild(ajoutNomJour)
    ajoutDiv.appendChild(ajoutImage)
    eltPrevisions.appendChild(ajoutDiv)


}


// ########################## Début du script ####################

document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.getElementById("searchButton")

    searchButton.addEventListener('click', () => {


        // console.log(document.getElementById('city').value)  /* afficher la valeur de city avec document.getElementById('city').value */
        const ville=document.getElementById("city").value;
        // const week = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

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
            // console.log("URL2 "+URL2)
            fetch(URL2) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
            // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
            .then(reponse => { 
                if (reponse.status == 200) { // on vérifier que l'appel à l'API a fonctionné
                    return reponse.json()  // ne pas oublier le return du callback
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
            })
            .then(donnee => {

                // on récupère le numero du jour (dayNumber)
                let today = new Date();
                //console.log("Hellolllllll" + today);
                let dayNumber = today.getDay();
                //console.log("dayyyyyyyyyyy "+ dayNumber);//on affiche la valeur du jour entre 0 à 7

                previsions.innerHTML = "";
                for (let i = 0; i < document.getElementById("jour-select").value; i++) {
                    // on va tester l'id pour chaque jour
                    //console.log(donnee.daily[i].weather[0].id);
                    let meteo = donnee.daily[i].weather[0].id;

                    
                    let dayName = week[(dayNumber + i) % 7];
                    console.log(dayName);//Le Nom du jour

                    // console.log(donnee.current.uvi);

                     let uvi = donnee.current.uvi;

                    if ( uvi <= 0 ) {
                      document.body.style.background ="#00004b"
                    } else {
                        document.body.style.background = "#23d7e2 ";
                    }


                    
                    displayWeatherDay(meteo, dayName)
                    // console.log(chooseDay()); 
   
                }


              
                

               



                //console.log("flam flam" +jourJ)
               


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
    })
})


