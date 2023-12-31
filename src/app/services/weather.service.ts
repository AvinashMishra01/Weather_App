import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apikey = 'a8d8223a2daf5f8492efa9b17a6073a7';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}`);
  }

}
