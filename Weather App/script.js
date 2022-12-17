const searchInput=document.getElementById('search_input');
const searchButton=document.getElementById('search_button');
const season=document.getElementById('season');
const weatherImage=document.getElementById('weather_image')
const temperatureBlock=document.getElementById('temperature');
const cityName=document.getElementById('city_name');
const windValue=document.getElementById('wind_value');
const humidityValue=document.getElementById('humidity_value');
const precipitationValue=document.getElementById('precipitation_value');

init();

function init(){
    searchButton.addEventListener('click',input);
}

function input(){
        if(searchInput.value === "")
    {
        alert("please provide the location name!");
    }else{
        fetchWeather();
    }

}

async function fetchWeather(){
    const location=searchInput.value;
    const streamResponse=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d8ab14f7e93c56cbe84562d28e8202bd`)
    const textBody=await streamResponse.text();
    const jsonData=JSON.parse(textBody);
    const weatherDescription=jsonData.weather[0].description;
    const weatherIcon=jsonData.weather[0].icon;
    const temperature=jsonData.main.temp;
    const humidity=jsonData.main.humidity;
    const windSpeed=jsonData.wind.speed;
    const cloudiness=jsonData.clouds.all;
    const placeName=jsonData.name;

    const tempInCelcius= ((5/9) * (temperature-32)).toFixed(2);

    season.innerText=weatherDescription;
    weatherImage.setAttribute('src',`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
    temperatureBlock.innerHTML=`${tempInCelcius}&deg;C`;
    cityName.innerText=placeName;
    windValue.innerHTML=`${windSpeed} <span class="weather_unit">km</span>`;
    humidityValue.innerHTML=`${humidity}<span class="weather_unit">%</span>`;
    precipitationValue.innerHTML=`${cloudiness}<span class="weather_unit">%</span>`;

}