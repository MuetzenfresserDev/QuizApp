import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  remainingTime: number = 120; // Die Anfangszeit in Sekunden
  intervalId: any; // ID des Intervalls

  ngOnInit() {
    
  }

  public startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }
}
