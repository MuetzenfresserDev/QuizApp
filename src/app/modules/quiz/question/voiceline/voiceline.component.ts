import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { VoicelineQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-voiceline',
  templateUrl: './voiceline.component.html',
  styleUrls: ['./voiceline.component.scss']
})
export class VoicelineComponent implements OnInit {

  @Input() data: VoicelineQuestion = {
    question: '',
    voiceLine: '',
    kind: '',
    correctAnswer: ''
  };

  @Input() playerCount:any = [];
  @Input() setWidth: string = '';

  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;

  constructor() { }

  ngOnInit() {

    console.log(this.data);
    console.log(this.playerCount);
    console.log(this.setWidth);

  }

  public playVoiceline(){

    console.log('sound')

    this.audioPlayer!.nativeElement.play();
  }

}
