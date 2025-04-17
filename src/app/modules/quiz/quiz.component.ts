import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  hostname: string = '';
  youtubeRef: string = ConstQuestions.youtubeRef;
  youtubeLink: SafeResourceUrl;
  playedQuestions: number = 0;

  constructor(private sanitizer: DomSanitizer) {
    this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.youtubeRef
    );

    if (JSON.parse(sessionStorage.getItem('host') || '[]').length != 0) {
      this.hostname = JSON.parse(sessionStorage.getItem('host') || '[]');
    }

    setInterval(() => {
      let questions: string[][] = JSON.parse(
        sessionStorage.getItem('usedQuestionColors') || '[]'
      );
      let counter = 0;
      for (let row of questions) {
        for (let e of row) {
          if (e == '' || e == 'bonus') {
            counter++;
          }
        }
      }
      this.playedQuestions = counter;
    }, 1000);
  }

  public setHostname(input: string) {
    this.hostname = input;
    sessionStorage.setItem('host', JSON.stringify(this.hostname));
  }
}
