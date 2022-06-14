class Weather{
  constructor(url , location){
    this.key =  "WnQ6jf7cy3trNovRyRqChF6JLfqGni1c";
    this.url = url;
    this.location = location;
  };
  get endpoint(){
    return `${this.url}?apikey=${this.key}&q=${this.location}`;
  };
   async getCity() {
    const request = await fetch(this.endpoint);
    let data = await request.json();
    return data[0]
  };
  async getWeather(){
    const city = await this.getCity();
    const id = city.Key;
    const endpointId = `http://dataservice.accuweather.com/currentconditions/v1/${id}`;
    const queries = `?apikey=${this.key}`;
    const request = await fetch(endpointId + queries);
    let data =  await request.json();
    return data[0];
  };
  async getFullData  (){
    const cityData = await this.getCity(this.location);
    const weatherData = await this.getWeather();
  
    return { cityData, weatherData };
  };
};
