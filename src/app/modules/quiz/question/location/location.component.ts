import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';
import { Player } from 'src/app/interfaces/player';
import { LocationQuestion } from 'src/app/interfaces/question';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit, AfterViewInit {
  @Input() data: LocationQuestion = {
    question: '',
    searchPicture: '',
    kind: '',
    markedPicture: '',
    imgurLink: '',
    bonus: false,
  };
  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;
  players: Player[] = [];
  showGesuchtesBild:boolean = false;
  show: boolean = true;
  showBackButton: boolean = false;
  showVideo: boolean = false;
  youtubeLink: SafeResourceUrl | undefined;
  youtubeQuestionLink: SafeResourceUrl | undefined;
  videoSize: { width: string; height: string } = ConstQuestions.videoSize;
  pictureFlag: boolean = false;

  audioContext: AudioContext | undefined;
  analyserNode: AnalyserNode | undefined;
  bufferLength: number | undefined;
  animationId: any;
  dataArray: any | undefined;

  pictureSize = ConstQuestions.pictureSize;

  constructor(
    private playerService: PlayerNameService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('players') || '[]').length != 0) {
      this.players = JSON.parse(sessionStorage.getItem('players') || '[]');
    } else {
      this.players = this.playerService.players;
    }

    if (this.data.searchVideo != undefined && this.data.searchVideo != '') {
      console.log('SAFE!');
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.data.answerVideo!
      );
      this.youtubeQuestionLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.data.searchVideo
      );
    }

    /* setTimeout(() => {
      document.getElementById("geo")!.style.display = "block";    
    }, 350); */
  }

  ngAfterViewInit() {
    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    const source = this.audioContext.createMediaElementSource(
      this.audioPlayer!.nativeElement
    );
    source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);

    this.drawVisualizer();
  }

  drawVisualizer() {
    this.animationId = requestAnimationFrame(() => this.drawVisualizer());

    this.analyserNode!.getByteTimeDomainData(this.dataArray);

    // Hier können Sie die Daten verwenden, um die Visualisierung zu zeichnen oder zu aktualisieren

    // Beispiel: Wellenform zeichnen
    const canvas = document.getElementById(
      'waveformCanvas'
    ) as HTMLCanvasElement;
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
    const sliceWidth = (width * 1.0) / this.bufferLength!;
    let x = 0;

    for (let i = 0; i < this.bufferLength!; i++) {
      const v = this.dataArray[i] / 128.0;
      const amplitude = 1.5; // 0.5 = kleiner, 1 = normal, >1 = größer
      const y = height / 2 + (v - 1) * (height / 2) * amplitude;

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

  public showQuestion() {
    this.showGesuchtesBild = false;
    this.show = true;
  }

  public clickShowGesuchtesBild(){
    this.showGesuchtesBild = true;
    this.show = false;
    this.showBackButton = false;
    document.getElementById('geo')!.style.display = 'none';
  }

  public clickShowCanvas() {
    this.showGesuchtesBild = false;
    this.show = false;
    document.getElementById('geo')!.style.display = 'block';
    this.showBackButton = true;
    console.log('true');
  }

  public clickShowVideo() {
    this.showGesuchtesBild = false;
    this.show = false;
    //document.getElementById("geo")!.style.display = "block";
    this.showBackButton = true;
    console.log('true');
    this.showVideo = true;
  }

  public clickShowQuestion() {
    this.showGesuchtesBild = false;
    this.show = true;
    document.getElementById('geo')!.style.display = 'none';
    this.showBackButton = false;
    this.showVideo = false;
  }

  public changePictureFlag() {
    this.pictureFlag = !this.pictureFlag;
  }

  public playVoiceline() {
    const player = this.audioPlayer!.nativeElement as HTMLAudioElement;

    if (!player.paused) {
      // Läuft schon → stoppen und auf Anfang setzen
      player.pause();
      player.currentTime = 0;
    } else {
      // Starten (immer von vorne)
      player.currentTime = 0;
      player.play();
    }
  }
}
