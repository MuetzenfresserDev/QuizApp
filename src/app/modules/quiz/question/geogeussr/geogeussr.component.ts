import { Component, Input, OnInit } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { GeoguessrQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-geogeussr',
  templateUrl: './geogeussr.component.html',
  styleUrls: ['./geogeussr.component.scss']
})
export class GeogeussrComponent implements OnInit {

  @Input() data: GeoguessrQuestion = {
    question: '',
    searchPicture: '',
    kind: '',
    markedPicture: '',
    imgurLink: '',
    bonus: false
  };

  showCorrected: boolean = false;
  hideAll: boolean = false;

  pictureSize: {width: string, height: string} = ConstQuestions.pictureSize;

  constructor() { }

  ngOnInit() {
  }

  public switchToCorrected(){
    this.showCorrected = true;
    this.hideAll = false;
  }

  public hideAllButWhiteboard(){
    this.hideAll = true;
  }

}
