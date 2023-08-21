import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  city = 'Lucknow';
  weatherData = {}

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getweather()
  }

  tempMain = '';
  temp_min = '';
  temp_max = '';
  humidity = '';
  wind = '';
temp_m_f='';



  getweather() {
    this.weatherService.getWeather(this.city).subscribe(data => {

      this.weatherData = data;
      this.tempMain = this.weatherData['main']['temp'] // kelvin data

      this.temp_m_f= ((((parseInt(this.tempMain)- 273.15)*1.8+32)).toFixed(2) )+'°F'
      this.tempMain =(( parseInt(this.tempMain) - 273.15).toFixed(2) )+'°C'


      // console.log("tis is tem[mai tem c ", this.tempMain, this.temp_m_f)
      this.temp_min = this.weatherData['main']['temp_min']
      this.temp_min = (( parseInt(this.temp_min) - 273.15 -1.21).toFixed(2) )


      this.temp_max = this.weatherData['main']['temp_max']
      this.temp_max =  (( parseInt(this.temp_max) - 273.15 +0.31).toFixed(2) )


      this.humidity = this.weatherData['main']['humidity']
      this.wind = this.weatherData['wind']['speed']
  this.getDayWea(this.weatherData['weather'])



    },
    error=>{

      Swal.fire("Warning", " City Name Not Found", 'warning')
    })
  }

  getImageUrl={}

     getDayWea(data){
this.getImageUrl={};
   for(let i=data.length-1; i<=data.length-1; i++)
   {
    if(data[i].main=='Rain'){
        this.getImageUrl['img']="../assets/rain_1.gif";
    }
    else if(data[i].main=='Clouds'){
      this.getImageUrl['video']='../assets/strom2.mp4'

    }
    else if(data[i].main=="Thunderstorm"){
      this.getImageUrl['img']='../assets/Thunderstorm.gif'

    }
    else if(data[i].main=='Haze' ||data[i].main=='Mist' ){
      this.getImageUrl['video']='../assets/Haze.mp4'
    }
    else if(data[i].main=='Clear'){
      this.getImageUrl['img']='../assets/clear.jpg'
    }
    else{
      this.getImageUrl['img']='../assets/rain.avif'
    }
    // console.log(' Url is ', this.getImageUrl)
   }
     }


}
