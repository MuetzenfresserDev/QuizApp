import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ErrorQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-errorPicture',
  templateUrl: './errorPicture.component.html',
  styleUrls: ['./errorPicture.component.scss']
})
export class ErrorPictureComponent implements OnInit, OnChanges {

  @Input() data: ErrorQuestion = {
    question: '',
    errorPicture: '',
    kind: '',
    correctedPicture: ''
  };

  showCorrected: boolean = false;
  hideAll: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.data);
  }

  public switchToCorrected(){
    this.showCorrected = true;
  }

  public hideAllButWhiteboard(){
    this.hideAll = true;
  }

}
