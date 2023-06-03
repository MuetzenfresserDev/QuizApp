import { Component, Input, OnInit } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { MultiplechoiceQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-multipleChoice',
  templateUrl: './multipleChoice.component.html',
  styleUrls: ['./multipleChoice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

  @Input() data: MultiplechoiceQuestion = {
    question: '',
    options: {
      option1: '',
      option2: '',
      option3: '',
      option4: ''
    },
    kind: '',
    correctAnswer: ''
  };

  @Input() playerCount:any = [];
  @Input() setWidth: string = '';

  whiteboardUrls: string[] = ConstQuestions.whiteboardUrls;

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

  constructor() { }

  ngOnInit() {

    this.setDimension(JSON.parse(sessionStorage.getItem('playerCount')|| '[]').fxFlex);

  }

  public clickShowAnswer(){
    this.showAnswer = true;
  }

  public clickShowBoards(){

    this.showButtons = true;

    this.visibleBoard.display = 'block';
    this.visibleWaiting.display = 'none';

    console.log(this.visibleBoard)

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

}
