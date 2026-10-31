import { Component, ElementRef, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { BOARD_COLORS, BOARD_WIDTHS, ERASER, MAX_BOARD_TEXT, type Point, type Stroke } from '@quiz/shared';
import { GameService } from '../core/game.service';
import { Expandable } from './expandable';

/** Schriftgröße je Strichstärke, als Vielfaches der Linienbreite. */
const TEXT_SCALE = 4;
const LIGHT_COLORS = ['#ffffff', '#e8b923'];
/** Lässt beim Klick nahe am Rand noch Platz zum Schreiben. */
const MAX_TEXT_X = 0.8;
const MAX_TEXT_Y = 0.92;
const FOCUS_RETRY_MS = 100;
const MIN_POINT_DISTANCE = 0.002;

@Component({
  selector: 'app-whiteboard',
  hostDirectives: [Expandable],
  template: `
    <div class="area">
      <div class="sheet" [class.notes]="notes() && image()">
        @if (image()) {
          <img [src]="image()" alt="" referrerpolicy="no-referrer" />
        }
        <canvas
          #canvas
          [class.editable]="editable()"
          [class.text-tool]="tool() === 'text'"
          (pointerdown)="start($event)"
          (pointermove)="move($event)"
          (pointerup)="end()"
          (pointercancel)="end()"
        ></canvas>
        @if (draft(); as draft) {
          @if (editable()) {
            <input
              #draftInput
              class="draft"
              aria-label="Text auf dem Whiteboard"
              placeholder="Text ..."
              [maxLength]="maxText"
              [style.color]="color()"
              [style.font-size.px]="draftFontPx()"
              [style.left.%]="draft.x * 100"
              [style.top.%]="draft.y * 100"
              [style.max-width.%]="(1 - draft.x) * 100"
              size="6"
              (input)="onDraftInput()"
              (keydown.enter)="commitText()"
              (keydown.escape)="cancelText($event)"
              (blur)="onDraftBlur()"
            />
          }
        }
        <button class="big-toggle" (click)="expand.toggle()">{{ expand.big() ? 'Klein' : 'Groß' }}</button>
      </div>
    </div>
    @if (editable()) {
      <div class="tools" role="toolbar" aria-label="Zeichenwerkzeuge">
        <button [class.on]="tool() === 'pen'" (click)="tool.set('pen')">Stift</button>
        <button [class.on]="tool() === 'text'" (click)="tool.set('text')">Text</button>
        <button [class.on]="tool() === 'eraser'" (click)="tool.set('eraser')">Radierer</button>
        @for (entry of colors; track entry) {
          <button class="color" [class.on]="color() === entry" [style.background]="entry" [attr.aria-label]="'Farbe ' + entry" (click)="color.set(entry)"></button>
        }
        @for (entry of widths; track entry; let i = $index) {
          <button class="width" [class.on]="width() === entry" [attr.aria-label]="'Strichstärke ' + (i + 1)" (click)="width.set(entry)">
            <span [style.height.px]="3 + i * 4" [style.width.px]="3 + i * 4"></span>
          </button>
        }
        <button (click)="game.undoStroke()">Rückgängig</button>
        <button class="danger" (click)="game.clearBoard()">Leeren</button>
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      height: 100%;
      min-height: 0;
    }
    .area {
      container-type: size;
      flex: 1;
      min-height: 0;
    }
    .sheet {
      aspect-ratio: 16 / 9;
      background: #f4efe3;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      width: min(100cqw, 100cqh * 16 / 9);
    }
    img,
    canvas {
      height: 100%;
      inset: 0;
      position: absolute;
      width: 100%;
    }
    img {
      object-fit: contain;
    }
    /* Die Zeichenfläche bleibt ganz, nur das Bild rückt zur Seite. */
    .sheet.notes img {
      border-right: 2px dashed rgba(43, 33, 21, 0.35);
      object-position: left top;
      width: 75%;
    }
    canvas.editable {
      cursor: crosshair;
      touch-action: none;
    }
    canvas.text-tool {
      cursor: text;
    }
    .draft {
      background: rgba(255, 255, 255, 0.75);
      border: 1px dashed #333;
      border-radius: 0;
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: bold;
      line-height: 1.2;
      padding: 0;
      position: absolute;
      width: auto;
    }
    .tools {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      flex: none;
      gap: 0.25rem;
      justify-content: center;
    }
    .tools {
      background: var(--surface-strong);
      border: 1px solid var(--line);
      border-radius: 14px;
      margin: 0 auto;
      padding: 0.25rem 0.5rem;
    }
    .tools button {
      font-size: 0.8em;
      padding: 0.15em 0.5em;
    }
    .tools .on {
      outline: 2px solid var(--gold-strong);
    }
    .color {
      border-radius: 50%;
      height: 1.5em;
      padding: 0;
      width: 1.5em;
    }
    .width {
      align-items: center;
      display: inline-flex;
      height: 1.5em;
    }
    .width span {
      background: var(--text);
      border-radius: 50%;
      display: block;
    }
  `,
})
export class Whiteboard {
  protected readonly game = inject(GameService);
  protected readonly expand = inject(Expandable);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly draftRef = viewChild<ElementRef<HTMLInputElement>>('draftInput');

  readonly playerId = input.required<string>();
  readonly image = input<string | undefined>();
  readonly editable = input(false);
  readonly notes = input(false);

  protected readonly colors = BOARD_COLORS;
  protected readonly widths = BOARD_WIDTHS;
  protected readonly maxText = MAX_BOARD_TEXT;
  protected readonly color = signal(BOARD_COLORS[0]!);
  protected readonly width = signal(BOARD_WIDTHS[1]!);
  protected readonly tool = signal<'pen' | 'text' | 'eraser'>('pen');
  /** Stelle, an der gerade Text eingegeben wird. */
  protected readonly draft = signal<Point | null>(null);

  private readonly strokes = computed(() => this.game.boards()[this.playerId()] ?? []);
  private current: Stroke | null = null;
  private strokeCounter = 0;

  constructor() {
    effect((onCleanup) => {
      const canvas = this.canvasRef().nativeElement;
      const observer = new ResizeObserver(() => this.resize(canvas));
      observer.observe(canvas);
      onCleanup(() => observer.disconnect());
    });

    effect(() => {
      this.strokes();
      this.redraw();
    });

    effect(() => {
      if (!this.editable()) this.draft.set(null);
    });

    effect(() => {
      this.draft();
      const input = this.draftRef()?.nativeElement;
      input?.focus();
      // Beim Klick ins inaktive Fenster greift der erste Versuch noch nicht.
      setTimeout(() => input?.focus(), FOCUS_RETRY_MS);
    });
  }

  protected draftFontPx(): number {
    return fontSize(this.width(), this.canvasRef().nativeElement.clientWidth);
  }

  /** Wächst mit dem Text und hält den Server auf Stand, falls Enter vergessen wird. */
  protected onDraftInput(): void {
    const input = this.draftRef()?.nativeElement;
    const draft = this.draft();
    if (!input || !draft) return;
    input.size = Math.max(input.value.length + 1, 6);
    const text = input.value.trim();
    this.game.sendDraft(text ? this.textStroke(draft, text) : null);
  }

  private textStroke(point: Point, text: string): Stroke {
    return { id: this.newId(), color: this.color(), width: this.width(), points: [point], text };
  }

  /** Ein leeres Feld bleibt offen: Der Fokus geht auch beim Fensterwechsel kurz verloren. */
  protected onDraftBlur(): void {
    if (this.draftRef()?.nativeElement.value.trim()) this.commitText();
  }

  protected commitText(): void {
    const draft = this.draft();
    if (!draft) return;
    // Nach dem Sperren hat der Server den Text schon übernommen.
    if (!this.editable()) {
      this.draft.set(null);
      return;
    }
    const input = this.draftRef()?.nativeElement;
    const text = input?.value.trim();
    // Das Feld wird beim direkten Klick an eine neue Stelle wiederverwendet.
    if (input) {
      input.value = '';
      input.size = 6;
    }
    this.draft.set(null);
    if (!text) return;
    this.game.addStroke(this.textStroke(draft, text));
  }

  protected cancelText(event: Event): void {
    // Sonst würde Escape zusätzlich die vergrößerte Ansicht schließen.
    event.stopPropagation();
    this.draft.set(null);
    this.game.sendDraft(null);
  }

  protected start(event: PointerEvent): void {
    if (!this.editable()) return;
    if (this.tool() === 'text') {
      // Verhindert, dass der Klick dem neuen Eingabefeld den Fokus wieder nimmt.
      event.preventDefault();
      this.commitText();
      const { x, y } = this.toPoint(event);
      this.draft.set({ x: Math.min(x, MAX_TEXT_X), y: Math.min(y, MAX_TEXT_Y) });
      return;
    }
    const target = event.target as HTMLCanvasElement;
    target.setPointerCapture(event.pointerId);
    this.current = {
      id: this.newId(),
      color: this.tool() === 'eraser' ? ERASER : this.color(),
      width: this.width(),
      points: [this.toPoint(event)],
    };
    this.redraw();
  }

  protected move(event: PointerEvent): void {
    if (!this.current) return;
    for (const sample of event.getCoalescedEvents?.() ?? [event]) {
      const point = this.toPoint(sample);
      const last = this.current.points.at(-1)!;
      // Dünnt dicht liegende Punkte aus, damit lange Striche im Serverlimit bleiben.
      if (Math.hypot(point.x - last.x, point.y - last.y) >= MIN_POINT_DISTANCE) this.current.points.push(point);
    }
    this.redraw();
  }

  protected end(): void {
    if (!this.current) return;
    const stroke = this.current;
    this.current = null;
    this.game.addStroke(stroke);
  }

  private newId(): string {
    return `${Date.now()}-${this.strokeCounter++}`;
  }

  private toPoint(event: PointerEvent): Point {
    const rect = this.canvasRef().nativeElement.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width),
      y: clamp((event.clientY - rect.top) / rect.height),
    };
  }

  private resize(canvas: HTMLCanvasElement): void {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    this.redraw();
  }

  private redraw(): void {
    const canvas = this.canvasRef().nativeElement;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    for (const stroke of this.strokes()) drawStroke(context, stroke, canvas);
    if (this.current) drawStroke(context, this.current, canvas);
  }
}

function fontSize(width: number, canvasWidth: number): number {
  return width * TEXT_SCALE * canvasWidth;
}

/** Bricht an Wortgrenzen um, damit Text nicht über den Rand des Boards läuft. */
function wrapLines(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  return [...lines, line];
}

function drawText(context: CanvasRenderingContext2D, stroke: Stroke, canvas: HTMLCanvasElement): void {
  const size = fontSize(stroke.width, canvas.width);
  const x = stroke.points[0]!.x * canvas.width;
  const y = stroke.points[0]!.y * canvas.height;
  context.globalCompositeOperation = 'source-over';
  context.font = `bold ${size}px Georgia, 'Times New Roman', serif`;
  context.textBaseline = 'top';
  context.fillStyle = stroke.color;
  // Heller oder dunkler Rand, damit Text auf Bildern lesbar bleibt.
  context.strokeStyle = LIGHT_COLORS.includes(stroke.color) ? '#111111' : '#ffffff';
  context.lineWidth = size * 0.14;

  wrapLines(context, stroke.text!, canvas.width - x).forEach((line, index) => {
    const lineY = y + index * size * 1.2;
    context.strokeText(line, x, lineY);
    context.fillText(line, x, lineY);
  });
}

function drawStroke(context: CanvasRenderingContext2D, stroke: Stroke, canvas: HTMLCanvasElement): void {
  if (stroke.text) {
    drawText(context, stroke, canvas);
    return;
  }
  const isEraser = stroke.color === ERASER;
  context.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
  context.strokeStyle = isEraser ? '#000' : stroke.color;
  context.lineWidth = stroke.width * canvas.width * (isEraser ? 3 : 1);

  const [first, ...rest] = stroke.points;
  if (!first) return;
  context.beginPath();
  context.moveTo(first.x * canvas.width, first.y * canvas.height);
  // Ein einzelner Klick soll einen sichtbaren Punkt ergeben.
  context.lineTo(first.x * canvas.width + 0.01, first.y * canvas.height);
  for (const point of rest) context.lineTo(point.x * canvas.width, point.y * canvas.height);
  context.stroke();
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
