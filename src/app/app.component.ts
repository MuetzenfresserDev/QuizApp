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
    this.requestService.keepAlive().subscribe({
      next: (response) => {
        console.log('Keep alive request successful:', response);
      },
      error: (error) => {
        console.error('Error in keep alive request:', error);
      }
    })
    setInterval(() => {
      this.requestService.keepAlive().subscribe({
        next: (response) => {
          console.log('Keep alive request successful:', response);
        },
        error: (error) => {
          console.error('Error in keep alive request:', error);
        }
      })
    }, 60000);
  }

}
