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
    bonus: false
  }

  hideAll: boolean = false;
  youtubeLink: SafeResourceUrl | undefined;
  videoSize: {width: string, height: string} = ConstQuestions.videoSize; 

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    if(this.data.video != ''){
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
    }

  }


  public hideAllButWhiteboard(){
    this.hideAll = true;
  }

}
