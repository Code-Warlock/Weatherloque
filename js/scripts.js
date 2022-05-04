const FORM = document.forms.getCity;

window.addEventListener("DOMContentLoaded", () => {
  if (location.port.includes("55")) {
    let weatherObj = new Weather(
      "http://dataservice.accuweather.com/locations/v1/cities/search",
      "Abeokuta"
    );
    weatherObj.getFullData(city).then((data) => {
      showWeather(data);
      console.log(data);
    });
  } else {
    let livelocation = new LiveLocation();
    livelocation.getUserLocation().then((data) => {
      let weatherObj = new Weather(
        "http://dataservice.accuweather.com/locations/v1/cities/search",
        data
      );
      weatherObj.getFullData().then((data) => {
        showWeather(data);
        console.log(data);
      });
    });
  }
});


let time = "";
const showWeather = (data) => {
  const { cityData, weatherData } = data;
  let displayScreen = document.querySelector(".intro");
  let logo = document.querySelector(".replaced-svg");
  if (weatherData.IsDayTime ) {
    let cloudgifs = ["mostly_clouds.webp" , "partly_clouds.gif" , "sun_clouds.gif"];
    let clear_skygif = ["clear_blue.gif" , "clear_almost.gif" ,  "anime_clear.gif"];
    let mild_raigifs = ["rain.gif", "raining.gif" , "rainywoods.gif"];
    time = "day";
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    Array.from(logo.children).forEach(child=> child.setAttribute("fill" , "#110023"));
    if(weatherData.WeatherText.toLowerCase().includes("sun") && weatherData.WeatherText.toLowerCase().includes("cloud")){
      
      document.body.style.backgroundImage = "url('./gifs/day/cut.gif')";
    }
    else if(weatherData.WeatherText.toLowerCase().includes("cloud") && !(weatherData.WeatherText.toLowerCase().includes("sun"))){

      document.body.style.backgroundImage = `url('./gifs/day/${cloudgifs[Math.floor(Math.random() * (cloudgifs.length-1))]}')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("clear")){

      document.body.style.backgroundImage = `url('./gifs/day/${clear_skygif[Math.floor(Math.random() * (clear_skygif.length))]}')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("rain") && !(weatherData.WeatherText.toLowerCase().includes("thunder"))){

      document.body.style.backgroundImage = `url('./gifs/day/${mild_raigifs[Math.floor(Math.random() * (mild_raigifs.length))]}')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("rain") && weatherData.WeatherText.toLowerCase().includes("thunder")){

      document.body.style.backgroundImage = `url('gifs/thundercloud.gif')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("drizz") || weatherData.WeatherText.toLowerCase().includes("shower")){
      
      document.body.style.backgroundImage = `url('gifs/day/rain_sky.gif')`;
    }
  } else {
    let cloudgifs = ["night_clouds.gif" , "mostly_cloudy.gif" , "night.gif"];
    let moonless = ["cloudy_night.gif"];
    let clear_nightgif = ["night_breeze.gif" , "night_stars.gif" ,  "no_clouds.webp" , "peaceful_night.gif" , "shooting_stars.gif" , "twinkling_stars.gif"];
    let rainynight = ["night_rain.gif" , "rain-raining.gif" ,  "rainDark.gif" , "raining.gif"];
    let thundernight = ["dark_cloud_thunder.gif" , "thunder_node.gif" ,  "storm.gif" , "thunder.gif"];
    time = "night";
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    Array.from(logo.children).forEach(child=> child.setAttribute("fill" , "orange"));
    if(weatherData.WeatherText.toLowerCase().includes("moon") && weatherData.WeatherText.toLowerCase().includes("cloud")){
      
      document.body.style.backgroundImage = `url('./gifs/night/${cloudgifs[Math.floor(Math.random() * (cloudgifs.length-1))]}')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("cloud") && !(weatherData.WeatherText.toLowerCase().includes("moon"))){
      
      document.body.style.backgroundImage = `url('./gifs/night/${moonless[Math.floor(Math.random() * (moonless.length-1))]}')`;
      document.body.style.backgroundImage = `url('gifs/night/thundercloud.gif')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("clear")){

      document.body.style.backgroundImage = `url('./gifs/night/${clear_nightgif[Math.floor(Math.random() * (clear_nightgif.length))]}')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("rain") && !(weatherData.WeatherText.toLowerCase().includes("thunder"))){

      document.body.style.backgroundImage = `url('./gifs/night/${rainynight[Math.floor(Math.random() * (rainynight.length))]}')`;
    }
    else if(weatherData.WeatherText.toLowerCase().includes("rain") && weatherData.WeatherText.toLowerCase().includes("thunder")){

      document.body.style.backgroundImage = `url('./gifs/night/${thundernight[Math.floor(Math.random() * (thundernight.length))]}')`;
    }
  }
  let icon =
    weatherData.WeatherIcon == 9  ||
    weatherData.WeatherIcon == 10 ||
    weatherData.WeatherIcon == 15 ||
    weatherData.WeatherIcon == 33 ||
    weatherData.WeatherIcon == 28 ||
    weatherData.WeatherIcon == 29
      ? ++weatherData.WeatherIcon
      : weatherData.WeatherIcon;
  let html = `
  <h1 class="main-heading">
    ${cityData.LocalizedName} <br>
  </h1>
  <img class="" src="./icons_${time}/${icon}.svg" alt="icon" />
  <div class="location-description">
    <p class="condition">${weatherData.WeatherText}</p>
    <p class="temperature">${weatherData.Temperature.Metric.Value}&deg;C</p>
  </div>
`;
  displayScreen.innerHTML = html;
};


FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = e.target.city.value;
  let weatherFormObj = new Weather(
    "http://dataservice.accuweather.com/locations/v1/cities/search",
    city
  );
  weatherFormObj.getFullData().then((data) => {
    showWeather(data);
    console.log(data);
  });
  e.target.reset();
});
