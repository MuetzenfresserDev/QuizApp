import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { ErrorPictureComponent } from './errorPicture/errorPicture.component';
import { GeogeussrComponent } from './geogeussr/geogeussr.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() data: any;
  @Input() playerCount: any = [];
  @Input() setWidth: string = '';

  @ViewChild(ErrorPictureComponent) errorPicture: ErrorPictureComponent | undefined;
  @ViewChild(GeogeussrComponent) geoguessr: GeogeussrComponent | undefined;

  showAnswer: boolean = false;
  showButtons: boolean = false;

  cardStyle = {
    width: '100%',
    height: '100%'
  }

  visibleBoard = {
    display: 'none'
  }

  visibleWaiting = {
    display: 'block'
  }

  whiteboardUrls: string[] = ConstQuestions.whiteboardUrls;

  blockNames: string[] = ['picA','picB','picC','picD',]

  constructor() { }

  ngOnInit() {
    this.setDimension(JSON.parse(sessionStorage.getItem('playerCount')|| '[]').fxFlex);
  }

  private setDimension(n: number){

    if(n == 25){
      this.cardStyle.width = "22vw";
      this.cardStyle.height = "33vh";
    } else if(n == 33){
      this.cardStyle.width = "30vw";
      this.cardStyle.height = "33vh";
    } else {
      this.cardStyle.width = "30vw";
      this.cardStyle.height = "33vh";
    }

  }

  public clickShowAnswer(){
    this.showAnswer = true;
  }

  public clickSwitchPictures(){
    this.errorPicture?.switchToCorrected();
    this.geoguessr?.switchToCorrected();
    this.showAnswer = true;   
  }

  public hideAnswer(){
    this.errorPicture?.hideAllButWhiteboard();
    this.geoguessr?.hideAllButWhiteboard();
  }

  public clickShowBoards(){

    this.showButtons = true;

    this.visibleBoard.display = 'block';
    this.visibleWaiting.display = 'none';

    console.log(this.visibleBoard)

  }

}
