import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';
import { GuessingQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-guessing',
  templateUrl: './guessing.component.html',
  styleUrls: ['./guessing.component.scss']
})
export class GuessingComponent implements OnInit {

  @Input() data: GuessingQuestion = {
    question: '',
    video: '',
    picture: '',
    kind: '',
    correctAnswer: '',
    bonus: false,
    videoQuestion: '',
    pictureQuestion: ''
  }

  hideAll: boolean = false;
  youtubeLink: SafeResourceUrl | undefined;
  youtubeQuestionLink: SafeResourceUrl | undefined;
  videoSize: {width: string, height: string} = ConstQuestions.videoSize;
  pictureSize: {width: string, height: string} = ConstQuestions.pictureSize; 

  showCorrected: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.data.video != ''){
      this.youtubeQuestionLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.videoQuestion);
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
    }   
  }

  public switchToCorrected(){
    this.showCorrected = true;
    this.hideAll = true;
  }

  public hideAllButWhiteboard(){
    this.hideAll = true;
    this.showCorrected = false;
  }

}
