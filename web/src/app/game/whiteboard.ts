import { Component, ElementRef, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { BOARD_COLORS, BOARD_WIDTHS, ERASER, type Point, type Stroke } from '@quiz/shared';
import { GameService } from '../core/game.service';
import { Expandable } from './expandable';

@Component({
  selector: 'app-whiteboard',
  hostDirectives: [Expandable],
  template: `
    <div class="area">
      <div class="sheet">
        @if (image()) {
          <img [src]="image()" alt="" referrerpolicy="no-referrer" />
        }
        <canvas
          #canvas
          [class.editable]="editable()"
          (pointerdown)="start($event)"
          (pointermove)="move($event)"
          (pointerup)="end()"
          (pointercancel)="end()"
        ></canvas>
        <button class="big-toggle" (click)="expand.toggle()">{{ expand.big() ? 'Klein' : 'Groß' }}</button>
      </div>
    </div>
    @if (editable()) {
      <div class="tools" role="toolbar" aria-label="Zeichenwerkzeuge">
        @for (entry of colors; track entry) {
          <button class="color" [class.on]="color() === entry" [style.background]="entry" [attr.aria-label]="'Farbe ' + entry" (click)="color.set(entry)"></button>
        }
        <button [class.on]="color() === eraser" (click)="color.set(eraser)">Radierer</button>
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
      border-radius: 4px;
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
    canvas.editable {
      cursor: crosshair;
      touch-action: none;
    }
    .tools {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      flex: none;
      gap: 0.25rem;
      justify-content: center;
    }
    .tools button {
      font-size: 0.95em;
      padding: 0.15em 0.5em;
    }
    .tools .on {
      outline: 2px solid var(--gold-strong);
    }
    .color {
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

  readonly playerId = input.required<string>();
  readonly image = input<string | undefined>();
  readonly editable = input(false);

  protected readonly colors = BOARD_COLORS;
  protected readonly widths = BOARD_WIDTHS;
  protected readonly eraser = ERASER;
  protected readonly color = signal(BOARD_COLORS[0]!);
  protected readonly width = signal(BOARD_WIDTHS[1]!);

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
  }

  protected start(event: PointerEvent): void {
    if (!this.editable()) return;
    const target = event.target as HTMLCanvasElement;
    target.setPointerCapture(event.pointerId);
    this.current = {
      id: `${Date.now()}-${this.strokeCounter++}`,
      color: this.color(),
      width: this.width(),
      points: [this.toPoint(event)],
    };
    this.redraw();
  }

  protected move(event: PointerEvent): void {
    if (!this.current) return;
    for (const sample of event.getCoalescedEvents?.() ?? [event]) {
      this.current.points.push(this.toPoint(sample));
    }
    this.redraw();
  }

  protected end(): void {
    if (!this.current) return;
    const stroke = this.current;
    this.current = null;
    this.game.addStroke(stroke);
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

function drawStroke(context: CanvasRenderingContext2D, stroke: Stroke, canvas: HTMLCanvasElement): void {
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
