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


const showWeather = (data) => {
  const { cityData, weatherData } = data;
  if (weatherData.IsDayTime ) {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    if(weatherData.WeatherText.toLowerCase().includes("cloud")){
      document.body.style.backgroundImage = "url('./gifs/cut.gif')";
    }
    else if(weatherData.WeatherText.toLowerCase().includes("sun") && weatherData.WeatherText.toLowerCase().includes("part")){
      document.body.style.backgroundImage = "url('./gifs/sun_clouds.gif')";
    }
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
  let displayScreen = document.querySelector(".intro");
  let icon =
    weatherData.WeatherIcon == 9 ||
    weatherData.WeatherIcon == 10 ||
    weatherData.WeatherIcon == 15
      ? ++weatherData.WeatherIcon
      : weatherData.WeatherIcon;
  let html = `
  <h1 class="main-heading">
    ${cityData.LocalizedName} <br>
  </h1>
  <img src="./icons/${icon}.svg" alt="icon" />
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
