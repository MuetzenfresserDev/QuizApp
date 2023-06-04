import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Inject, Input, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
})
export class WhiteboardComponent implements OnInit, AfterViewInit {
  @Input() url: string = '';

  id: string = 'id';

  iframeStyle = {
    width: '100%',
    height: '100%',
  };

  containerString: string = '';

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {

    if (this.url == '99090540-6ea4-4014-ae2a-db97e028dba8') {
      this.containerString = 'wt-container1';
    } else if (this.url == 'd825987e-cff0-45ef-9d1a-b34dbcf3d6c5') {
      this.containerString = 'wt-container2';
    } else if (this.url == '1b942aac-2e88-424d-96ed-3576e90dbfc9') {
      this.containerString = 'wt-container3';
    } else {
      this.containerString = 'wt-container4';
    }

    setTimeout(() => {
      let script = this._renderer2.createElement('script');

    console.log(this.url);

    

    script.type = `text/javascript`;
    script.text = `
              {
                  var wt = new api.WhiteboardTeam('#${this.containerString}', {
                    clientId: '91565afc7a2abdba4e9ad5a45b9d34f7',
                    boardCode: '${this.url}',
                    participant: {
                      role : 'editor'
                  },
                  board: {
                    tool: 'pan'
                }
                });
              }
          `;

    this._renderer2.appendChild(this._document.body, script);
    }, 1000);

    this.setDimension(
      JSON.parse(sessionStorage.getItem('playerCount') || '[]').fxFlex
    );
  }

  ngAfterViewInit(): void {
    
  }

  private setDimension(n: number) {
    if (n == 25) {
      this.iframeStyle.width = '22vw';
      this.iframeStyle.height = '33vh';
    } else if (n == 33) {
      this.iframeStyle.width = '30vw';
      this.iframeStyle.height = '33vh';
    } else {
      this.iframeStyle.width = '30vw';
      this.iframeStyle.height = '33vh';
    }
  }
}
