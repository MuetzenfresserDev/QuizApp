import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() remainingTime: number = 0; // Die Anfangszeit in Sekunden
  intervalId: any; // ID des Intervalls

  audio: HTMLAudioElement | undefined;

  ngOnInit() {
    
  }

  constructor(){
    this.audio = new Audio();
    this.audio.src = 'assets/timer/timer.mp3';
  }

  public startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;

      if(this.remainingTime === 10){
        this.audio?.play();
      }

      if (this.remainingTime === 0) {
        clearInterval(this.intervalId);
        
      }
    }, 1000);
  }
}
