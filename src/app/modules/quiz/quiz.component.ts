import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  hostname: string = '';

  constructor() {
   }

  public setHostname(input: string){
    this.hostname = input;
  }

}
