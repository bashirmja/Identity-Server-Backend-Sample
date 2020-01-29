import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-autorized-data',
  templateUrl: './fetch-autorized-data.component.html'
})
export class FetchAutorizedDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient) {
    http.get<WeatherForecast[]>('https://localhost:44316/weatherforecast/1').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
