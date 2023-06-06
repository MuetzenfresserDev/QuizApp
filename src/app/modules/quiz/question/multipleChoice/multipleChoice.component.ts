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
    correctAnswer: '',
    bonus: false
  };

  constructor() { }

  ngOnInit() {

  }

}
