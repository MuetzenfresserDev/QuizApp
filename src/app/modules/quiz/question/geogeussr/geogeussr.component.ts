import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstQuestions } from 'src/app/constQuestions';
import { GeoguessrQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'app-geogeussr',
  templateUrl: './geogeussr.component.html',
  styleUrls: ['./geogeussr.component.scss']
})
export class GeogeussrComponent implements OnInit, OnChanges {

  @Input() data: GeoguessrQuestion = {
    question: '',
    searchPicture: '',
    kind: '',
    markedPicture: '',
    imgurLink: '',
    bonus: false
  };

  videoSize = ConstQuestions.videoSize;
  youtubeLink: SafeResourceUrl | undefined;
  showCorrected: boolean = false;
  hideAll: boolean = false;

  pictureSize: {width: string, height: string} = ConstQuestions.pictureSize;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data.video){
      this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
    }
  }

  public switchToCorrected(){
    this.showCorrected = true;
    this.hideAll = false;
  }

  public hideAllButWhiteboard(){
    this.hideAll = true;
  }

}
