import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ConstQuestions } from 'src/app/constQuestions';
import { PlayerNameService } from 'src/app/services/playerName/playerName.service';

declare const api: any;

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
})
export class WhiteboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() url: string = '';
  @Input() blockName: string = '';
  @Input() index: number = 0;
  @Input() imgurLink: string = '';
  @Input() imposter: string = '';
  @Input() imgurLinkImposter: string = '';

  iframeStyle = {
    width: '100%',
    height: '100%',
  };

  containerString: string = '';

  playerName: string = '';
  clientId: string = ConstQuestions.clientId;
  whiteboardUrls: string[] = ConstQuestions.whiteboardUrls;

  /**
   * Die eigentliche Whiteboard-Team-Instanz.
   *
   * Früher wurde diese als globale Variable über
   * "var picA = new api.WhiteboardTeam(...)" erzeugt.
   *
   * Das ist problematisch, weil Angular den Component mehrfach
   * erzeugen/zerstören kann und dadurch alte Instanzen weiterleben können.
   */
  private whiteboard: any = null;

  /**
   * Verhindert, dass ein bereits gestarteter Initialisierungsprozess
   * nach ngOnDestroy noch weiterarbeitet.
   */
  private destroyed = false;

  /**
   * NEU: Statische, klassenweite Warteschlange.
   *
   * Grund: Wenn mehrere WhiteboardTeam-Instanzen (fast) gleichzeitig
   * erzeugt werden, laufen sie serverseitig offenbar über dieselbe
   * Hub-"uid" (siehe Konsole: gleiche uid, unterschiedliche id pro
   * Board). Dadurch kommt es zu Race Conditions: clear()/drawImage()
   * lösen zwar ihr Promise auf ("FERTIG" im Log), der eigentliche
   * Befehl wird aber nur auf EINEM der Boards wirklich ausgeführt.
   *
   * Diese Queue sorgt dafür, dass jede Board-Instanz erst startet
   * (create -> waitUntilReady -> clear -> Bild/Platzhalter), wenn die
   * vorherige komplett fertig ist. Ein Fehler/Timeout einer Instanz
   * blockiert die Queue dabei nicht dauerhaft (siehe .catch unten).
   */
  private static initQueue: Promise<void> = Promise.resolve();

  /**
   * NEU: Gemeinsames "Gate" für alle Boards eines Frage-Durchgangs.
   *
   * Beobachtung: Ein Draw-Befehl (clear/drawImage/drawRectangle) auf
   * einer bereits fertig verbundenen Board-Instanz kann verloren gehen
   * (Promise löst nie auf), SOLANGE noch andere Board-Instanzen ihre
   * WebSocket-Verbindung zum selben Hub aufbauen. Sobald alle vier
   * Verbindungen einmal stehen, laufen die Befehle zuverlässig durch.
   *
   * Deshalb: Objekterzeugung + waitUntilReady() bleiben für alle Boards
   * parallel (wichtig fürs Layout-Timing, siehe initQueue-Kommentar
   * weiter oben in der Historie), aber BEVOR ein Board seinen ersten
   * Zeichenbefehl an die Queue anhängt, wartet es zusätzlich ein festes
   * Zeitfenster ab, damit alle Geschwister-Boards Zeit hatten, ihre
   * Verbindung aufzubauen.
   */
  private static batchGatePromise: Promise<void> | null = null;

  private static getBatchGate(): Promise<void> {
    if (!WhiteboardComponent.batchGatePromise) {
      WhiteboardComponent.batchGatePromise = new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      }).then(() => {
        // Nach Ablauf wieder zurücksetzen, damit die nächste Frage/Runde
        // (neue Board-Instanzen) ein frisches Gate bekommt.
        setTimeout(() => {
          WhiteboardComponent.batchGatePromise = null;
        }, 0);
      });
    }
    return WhiteboardComponent.batchGatePromise;
  }

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private playerNameService: PlayerNameService,
  ) {}

  ngOnInit(): void {
    console.log('ITS HAPPENING');

    this.playerName =
      this.playerNameService.playerNames[this.index] ||
      `Spieler ${this.index + 1}`;

    this.setContainer();

    this.setDimension(
      JSON.parse(sessionStorage.getItem('playerCount') || '[]').fxFlex,
    );

    /*
     * Der Imposter bekommt sein eigenes Bild.
     *
     * Wichtig:
     * Wir verändern hier nicht mehr den Input selbst, sondern bestimmen
     * eine lokale Bild-URL. Dadurch bleibt der Angular-Input unverändert.
     */
    if (this.url === this.imposter && this.imgurLinkImposter) {
      this.imgurLink = this.imgurLinkImposter;
    }
  }

  ngAfterViewInit(): void {
    /*
     * Das Whiteboard benötigt das bereits gerenderte Container-Element.
     *
     * WICHTIG: Der ursprüngliche Code hat vor dem Erzeugen des Widgets
     * bewusst 500ms gewartet (siehe alter Code: setTimeout(..., 500)).
     * Diese Verzögerung gibt dem Browser Zeit, das Flexbox-/vw-Layout
     * der Container fertig zu berechnen, BEVOR das Whiteboard-Team-
     * Widget dessen Breite/Höhe ausliest. Ohne diese Pause (z.B. wenn
     * man direkt in ngAfterViewInit erzeugt) kann das Widget eine noch
     * nicht final layoutete, zu große Breite messen und dann selbst
     * über die eigentliche Box hinaus rendern.
     *
     * Deshalb reproduzieren wir diese 500ms-Pause hier wieder, obwohl
     * die Objekterzeugung ansonsten für alle Boards parallel bleibt
     * (kein serialisiertes Warten aufeinander - nur dieser feste,
     * gleiche Delay für alle).
     */
    setTimeout(() => {
      this.initializeWhiteboard();
    }, 500);
  }

  /**
   * Bestimmt anhand des Board-Codes den zugehörigen Container.
   */
  private setContainer(): void {
    if (this.url === this.whiteboardUrls[0]) {
      this.containerString = 'wt-container1';
    } else if (this.url === this.whiteboardUrls[1]) {
      this.containerString = 'wt-container2';
    } else if (this.url === this.whiteboardUrls[2]) {
      this.containerString = 'wt-container3';
    } else {
      this.containerString = 'wt-container4';
    }
  }

  /**
   * Initialisiert das Whiteboard.
   */
  private initializeWhiteboard(): void {
    if (this.destroyed) {
      return;
    }

    /*
     * api.js wird normalerweise bereits über index.html geladen.
     *
     * Falls es zum Zeitpunkt der Initialisierung noch nicht verfügbar
     * ist, versuchen wir es kurz danach erneut.
     */
    if (typeof api === 'undefined' || !api.WhiteboardTeam) {
      console.warn(
        'Whiteboard Team API ist noch nicht verfügbar. Initialisierung wird erneut versucht.',
      );

      setTimeout(() => {
        this.initializeWhiteboard();
      }, 100);

      return;
    }

    const container = this._document.getElementById(this.containerString);

    if (!container) {
      console.error(
        `Whiteboard-Container "${this.containerString}" wurde nicht gefunden.`,
      );

      return;
    }

    /*
     * Falls aus irgendeinem Grund bereits eine alte Instanz existiert,
     * wird diese vor dem Erzeugen einer neuen Instanz entfernt.
     */
    this.destroyWhiteboard();

    try {
      this.whiteboard = new api.WhiteboardTeam(`#${this.containerString}`, {
        clientId: this.clientId,
        boardCode: this.url,
        participant: {
          role: 'editor',
        },
        board: {
          tool: 'pan',
        },
      });

      this.whiteboard
        .waitUntilReady()
        .then(async () => {
          /*
           * Erst warten, bis alle Geschwister-Boards Zeit hatten, ihre
           * WebSocket-Verbindung aufzubauen (siehe getBatchGate()),
           * dann erst den eigentlichen Zeichenbefehl an die Queue
           * anhängen. Das verhindert, dass ein Draw-Befehl verloren
           * geht, während parallel noch andere Boards verbinden.
           */
          await WhiteboardComponent.getBatchGate();

          WhiteboardComponent.initQueue = WhiteboardComponent.initQueue.then(
            () => this.handleWhiteboardReady(),
          );
          return WhiteboardComponent.initQueue;
        })
        .catch((error: any) => {
          console.error(
            `Whiteboard "${this.url}" konnte nicht initialisiert werden:`,
            error,
          );
        });
    } catch (error) {
      console.error(
        `Fehler beim Erzeugen des Whiteboards "${this.url}":`,
        error,
      );
    }
  }

  /**
   * Wird aufgerufen, sobald Whiteboard Team meldet,
   * dass das Board vollständig geladen und bereit ist.
   *
   * NEU:
   * - clear() und der anschließende Zeichen-Schritt sind jetzt mit
   *   withTimeout() abgesichert. Bisher konnte ein hängendes Promise
   *   (weder resolve noch reject) komplett stumm bleiben - das war
   *   vermutlich der Grund, warum in der Konsole für Board 1-3 einfach
   *   nichts nach "CLEAR FERTIG" mehr auftauchte.
   * - Falls ein gültiger imgurLink vorhanden ist, wird jetzt tatsächlich
   *   das Bild über wt.drawImage() geladen (vorher wurde imgurLink nie
   *   verwendet, es wurde immer nur das schwarze Platzhalter-Rechteck
   *   gezeichnet).
   */
  private async handleWhiteboardReady(): Promise<void> {
    if (this.destroyed || !this.whiteboard) {
      return;
    }

    try {
      console.log(
        'Whiteboard ist bereit:',
        this.url,
        'Container:',
        this.containerString,
      );
      console.log('CLEAR START:', {
        board: this.url,
        container: this.containerString,
        index: this.index,
        player: this.playerName,
      });

      /*
       * clear() liefert ein Promise zurück.
       * Deshalb warten wir explizit darauf - jetzt mit Timeout,
       * damit ein hängendes Promise sichtbar wird statt ewig zu pending.
       */
      await this.withTimeout(this.whiteboard.board.clear(), 8000, 'clear');

      console.log('CLEAR FERTIG:', {
        board: this.url,
        container: this.containerString,
        index: this.index,
        player: this.playerName,
      });

      if (this.destroyed || !this.whiteboard) {
        return;
      }

      if (this.hasImage()) {
        console.log('DRAW IMAGE START:', {
          board: this.url,
          container: this.containerString,
          index: this.index,
          player: this.playerName,
          imgurLink: this.imgurLink,
        });

        const image = await this.withTimeout(
          this.whiteboard.drawImage(this.imgurLink),
          10000,
          'drawImage',
        );

        console.log('DRAW IMAGE FERTIG:', {
          board: this.url,
          container: this.containerString,
          index: this.index,
          player: this.playerName,
          image: image,
        });

        /*
         * WICHTIG: viewport.zoomTo() wird hier bewusst NICHT aufgerufen.
         *
         * Der Container ist zu diesem Zeitpunkt in aller Regel per
         * display:none versteckt (Platzhalter wird angezeigt, bis der
         * Nutzer auf "Aufdecken" klickt). Ein Element mit display:none
         * hat die Layout-Größe 0x0 - die Whiteboard-Team-Bibliothek
         * kann daraus keine gültige Zoom-Transformationsmatrix berechnen
         * und wirft "InvalidStateError: The matrix is not invertible".
         *
         * Auch ein späterer, verzögerter zoomTo()-Aufruf (z.B. beim
         * Einblenden) hat das Problem nicht zuverlässig gelöst: Der
         * Fehler trat teils asynchron in einem internen dispatch-
         * Handler der Bibliothek auf, außerhalb der Reichweite unseres
         * try/catch, und hat danach den Viewport des betroffenen
         * Boards dauerhaft kaputt gemacht (Board blieb leer).
         *
         * zoomTo() wird deshalb komplett weggelassen. drawImage()
         * allein reicht aus, damit das Bild auf dem Board liegt - die
         * Nutzer können bei Bedarf selbst über die Pan/Zoom-Buttons
         * nachjustieren.
         */
      } else {
        /*
         * Erst NACHDEM clear() fertig ist, zeichnen wir den Platzhalter,
         * falls kein Bild vorhanden ist.
         */
        const result = await this.withTimeout(
          this.whiteboard.drawRectangle(70, 70, 500, 300, '#000000', 0.5, null),
          8000,
          'drawRectangle',
        );

        console.log('RECTANGLE FERTIG:', {
          board: this.url,
          container: this.containerString,
          index: this.index,
          player: this.playerName,
          result: result,
        });
      }
    } catch (error) {
      console.error(
        `Fehler beim Bearbeiten des Whiteboards "${this.url}":`,
        error,
      );
    }
  }

  /**
   * Hilfsfunktion: hängt an ein Promise ein Timeout, damit ein
   * nie-auflösendes Promise (weder resolve noch reject) nicht mehr
   * stumm für immer pending bleibt, sondern nach "ms" Millisekunden
   * mit einem aussagekräftigen Fehler rejected wird.
   */
  private withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(
          () => reject(new Error(`${label} timed out after ${ms}ms (board ${this.url})`)),
          ms,
        ),
      ),
    ]);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Prüft, ob eine gültige Bild-URL vorhanden ist.
   */
  private hasImage(): boolean {
    return (
      typeof this.imgurLink === 'string' &&
      this.imgurLink.trim() !== '' &&
      this.imgurLink !== 'undefined'
    );
  }

  /**
   * Räumt die Whiteboard-Team-Instanz auf.
   *
   * Die API stellt dafür destroy() zur Verfügung.
   */
  private destroyWhiteboard(): void {
    if (!this.whiteboard) {
      return;
    }

    try {
      this.whiteboard.destroy();
      console.log('Whiteboard-Instanz zerstört:', this.url);
    } catch (error) {
      console.warn(
        `Fehler beim Zerstören des Whiteboards "${this.url}":`,
        error,
      );
    } finally {
      this.whiteboard = null;
    }
  }

  ngOnDestroy(): void {
    /*
     * Verhindert, dass ein noch laufender Promise nach dem Entfernen
     * des Components weitere Aktionen auf dem Board ausführt.
     */
    this.destroyed = true;

    this.destroyWhiteboard();
  }

  /**
   * Zeigt das echte Whiteboard und versteckt den Platzhalter.
   */
  public einblenden(): void {
    const div = this._document.getElementById(this.containerString);
    const platzhalter = this._document.getElementById(this.getPlaceholderId());

    if (div) {
      div.style.display = 'block';
    }

    if (platzhalter) {
      platzhalter.style.display = 'none';
    }
  }

  /**
   * Liefert die ID des zum Whiteboard gehörenden Platzhalters.
   */
  private getPlaceholderId(): string {
    switch (this.containerString) {
      case 'wt-container1':
        return 'platzHalter1';

      case 'wt-container2':
        return 'platzHalter2';

      case 'wt-container3':
        return 'platzHalter3';

      default:
        return 'platzHalter4';
    }
  }

  private setDimension(n: number): void {
    /*
     * WICHTIG: sessionStorage liefert "fxFlex" teilweise als String
     * (z.B. "25" statt 25). Der Vergleich "n === 25" (strikte
     * Gleichheit) schlägt dann fehl, obwohl der Wert inhaltlich passt -
     * der Code landet fälschlich im else-Zweig (30vw) statt im
     * 22vw-Zweig, wodurch 4 Boards nebeneinander die Viewport-Breite
     * überschreiten (4 x 30vw = 120vw statt 4 x 22vw = 88vw).
     *
     * Deshalb wird n hier zuerst robust in eine Zahl umgewandelt,
     * unabhängig davon, ob es als String oder Number ankommt.
     */
    const parsed = Number(n);

    console.log(
      'setDimension() erhält n =',
      n,
      '(typeof:', typeof n, ', geparst:', parsed, ')',
      '(Rohwert aus sessionStorage:',
      sessionStorage.getItem('playerCount'),
      ')',
    );

    if (parsed === 25) {
      this.iframeStyle.width = '22vw';
      this.iframeStyle.height = '33vh';
    } else if (parsed === 33) {
      this.iframeStyle.width = '30vw';
      this.iframeStyle.height = '33vh';
    } else {
      this.iframeStyle.width = '30vw';
      this.iframeStyle.height = '33vh';
    }

    console.log('iframeStyle gesetzt auf:', this.iframeStyle);
  }
}