import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VoicelineQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-voiceline',
  templateUrl: './voiceline.component.html',
  styleUrls: ['./voiceline.component.scss'],
})
export class VoicelineComponent implements OnInit, AfterViewInit {
  @Input() data: VoicelineQuestion = {
    question: '',
    voiceLine: '',
    kind: '',
    correctAnswer: '',
  };

  @Input() playerCount: any = [];
  @Input() setWidth: string = '';

  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;
  audioContext: AudioContext | undefined;
  analyserNode: AnalyserNode | undefined;
  bufferLength: number | undefined;
  dataArray: any | undefined;

  constructor() {}

  ngOnInit() {
    console.log(this.data);
    console.log(this.playerCount);
    console.log(this.setWidth);
  }

  ngAfterViewInit() {
    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    const source = this.audioContext.createMediaElementSource(this.audioPlayer!.nativeElement);
    source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);

    this.drawVisualizer();
  }

  drawVisualizer() {
    requestAnimationFrame(() => this.drawVisualizer());
  
    this.analyserNode!.getByteTimeDomainData(this.dataArray);
  
    // Hier können Sie die Daten verwenden, um die Visualisierung zu zeichnen oder zu aktualisieren
  
    // Beispiel: Wellenform zeichnen
    const canvas = document.getElementById('waveformCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
  
    context!.fillStyle = 'rgba(0, 0, 0, 0.2)';
    context!.fillRect(0, 0, width, height);
    context!.strokeStyle = '#ffffff'; // Weiße Linienfarbe
    context!.lineWidth = 2; // Linienstärke von 2 Pixeln
    context!.lineJoin = 'round'; // Runde Linienverbindungen
    context!.lineCap = 'round'; // Runde Linienenden

    context!.clearRect(0, 0, width, height);
    context!.beginPath();
    const sliceWidth = width * 1.0 / this.bufferLength!;
    let x = 0;
  
    for (let i = 0; i < this.bufferLength!; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = v * height / 2;
    
      if (i === 0) {
        context!.moveTo(x, y);
      } else {
        context!.lineTo(x, y);
      }
    
      x += sliceWidth;
    }
  
    context!.lineTo(canvas.width * 1.1, canvas.height / 2);
    context!.stroke();
  
  }

  public playVoiceline() {
    console.log('sound');
    
    this.audioPlayer!.nativeElement.play();
  }
}
