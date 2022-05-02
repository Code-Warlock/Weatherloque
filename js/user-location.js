class LiveLocation{
  constructor(){
    navigator.geolocation.getCurrentPosition( pos =>{
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    });
  }
 async  getUserLocation(){
    const request =  await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.latitude}&longitude=${this.longitude}&localityLanguage=en`);
    const data = await request.json();
    return data.principalSubdivision.split(" ")[0];
  }
}


