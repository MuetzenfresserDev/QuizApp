import { Component, OnInit } from '@angular/core';
import { RequestDataService } from './services/request/requestData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quizApp';

  muted:boolean = true;

  ngOnInit(): void {
    //sessionStorage.clear();
  }

  constructor(private requestService: RequestDataService) {
    setInterval(() => {
      this.requestService.keepAlive().subscribe({
        next: (response) => {
          console.log('Keep alive (GEOGUESS) request successful:', response);
        },
        error: (error) => {
          console.error('Keep alive (GEOGUESS)', error);
        }
      })
      this.requestService.keepAlive2().subscribe({
        next: (response) => {
          console.log('Keep alive (BUZZER)', response);
        },
        error: (error) => {
          console.error('Keep alive (BUZZER)', error);
        }
      })
    }, 600000);
  }

}
