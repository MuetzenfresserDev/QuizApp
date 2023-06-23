import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Inject, Input, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
})
export class WhiteboardComponent implements OnInit, AfterViewInit {
  @Input() url: string = '';
  @Input() blockName: string = '';
  @Input() index: number = 0;
  @Input() imgurLink = '';

  id: string = 'id';

  iframeStyle = {
    width: '100%',
    height: '100%',
  };

  containerString: string = '';

  playerName: string = '';
  clientId: string = ConstQuestions.clientId;
  whiteboardUrls: string[] = ConstQuestions.whiteboardUrls;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private playerNameService: PlayerNameService
  ) {}

  ngOnInit() {
    this.playerName = this.playerNameService.playerNames[this.index];

    if (this.url == this.whiteboardUrls[0]) {
      this.containerString = 'wt-container1';
    } else if (this.url == this.whiteboardUrls[1]) {
      this.containerString = 'wt-container2';
    } else if (this.url == this.whiteboardUrls[2]) {
      this.containerString = 'wt-container3';
    } else {
      this.containerString = 'wt-container4';
    }

    console.log(this.blockName)
    console.log(this.imgurLink)

    setTimeout(() => {
      let script = this._renderer2.createElement('script');

      console.log(this.url);
      console.log(this.blockName);
      console.log(this.imgurLink);

      script.type = `text/javascript`;

      if (this.imgurLink != '' && this.imgurLink != undefined && this.imgurLink != 'undefined') {
        script.text = `
              {
                  var ${this.blockName} = new api.WhiteboardTeam('#${this.containerString}', {
                    clientId: '${this.clientId}',
                    boardCode: '${this.url}',
                    participant: {
                      role : 'editor'
                  },
                  board: {
                    tool: 'pan'
                }
                });
                ${this.blockName}.waitUntilReady()
                .then((ctx) => {


                  setTimeout(() => {
                  ${this.blockName}.board.clear();
                  

                  }, 1000);


                  setTimeout(() => {
                  ${this.blockName}.drawImage('${this.imgurLink}',65,65);

                  }, 2000);


                })
                .catch((error) => console.log(error));
              }
          `;
      } else {
        script.text = `
              {
                  var ${this.blockName} = new api.WhiteboardTeam('#${this.containerString}', {
                    clientId: '${this.clientId}',
                    boardCode: '${this.url}',
                    participant: {
                      role : 'editor'
                  },
                  board: {
                    tool: 'pan'
                }
                });
                ${this.blockName}.waitUntilReady()
                .then((ctx) => {

                  setTimeout(() => {
                  ${this.blockName}.board.clear();
                  console.log('clearing')
                  }, 2000);

                  setTimeout(() => {
                    ${this.blockName}.drawRectangle(70, 70, 500, 300, '#000000', 0.5, null);
                  }, 2500);

                })
                .catch((error) => console.log(error));
              }
          `;
      }

      this._renderer2.appendChild(this._document.body, script);
    }, 500);

    this.setDimension(
      JSON.parse(sessionStorage.getItem('playerCount') || '[]').fxFlex
    );
  }

  ngAfterViewInit(): void {}

  public einblenden() {
    if (this.containerString == 'wt-container1') {
      var div = document.getElementById('wt-container1');
      div!.style.display = 'block';
      var platzhalter = document.getElementById('platzHalter1');
      platzhalter!.style.display = 'none';
    } else if (this.containerString == 'wt-container2') {
      var div = document.getElementById('wt-container2');
      div!.style.display = 'block';
      var platzhalter = document.getElementById('platzHalter2');
      platzhalter!.style.display = 'none';
    } else if (this.containerString == 'wt-container3') {
      var div = document.getElementById('wt-container3');
      div!.style.display = 'block';
      var platzhalter = document.getElementById('platzHalter3');
      platzhalter!.style.display = 'none';
    } else {
      var div = document.getElementById('wt-container4');
      div!.style.display = 'block';
      var platzhalter = document.getElementById('platzHalter4');
      platzhalter!.style.display = 'none';
    }
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
