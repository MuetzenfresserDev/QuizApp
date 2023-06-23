import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  hostname: string = '';
  youtubeRef: string = ConstQuestions.youtubeRef;
  youtubeLink: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeRef);
   }

  public setHostname(input: string){
    this.hostname = input;
  }

}
