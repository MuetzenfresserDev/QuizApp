import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {

  @Input() url: string = '';

  iFrameUrl?: SafeResourceUrl;
  id: string = "id";

  iframeStyle = {
    width: '100%',
    height: '100%'
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    console.log(JSON.parse(sessionStorage.getItem('playerCount')|| '[]').fxFlex)

    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    this.setDimension(JSON.parse(sessionStorage.getItem('playerCount')|| '[]').fxFlex);

  }

  private setDimension(n: number){

    if(n == 25){
      this.iframeStyle.width = "22vw";
      this.iframeStyle.height = "33vh";
    } else if(n == 33){
      this.iframeStyle.width = "30vw";
      this.iframeStyle.height = "33vh";
    } else {
      this.iframeStyle.width = "30vw";
      this.iframeStyle.height = "33vh";
    }

  }

}
