import { Component, inject, input } from '@angular/core';
import { Expandable } from './expandable';

@Component({
  selector: 'app-zoom-image',
  hostDirectives: [Expandable],
  template: `
    <button class="plain" [attr.aria-label]="(expand.big() ? 'Verkleinern: ' : 'Vergrößern: ') + alt()" (click)="expand.toggle()">
      <img [src]="src()" [alt]="alt()" />
    </button>
  `,
  styles: `
    :host {
      display: block;
      min-height: 0;
      min-width: 0;
    }
    .plain {
      background: none;
      border: 0;
      cursor: zoom-in;
      display: block;
      height: 100%;
      padding: 0;
      width: 100%;
    }
    :host(.big-stage) .plain {
      cursor: zoom-out;
    }
    img {
      display: block;
      height: 100%;
      object-fit: contain;
      width: 100%;
    }
  `,
})
export class ZoomImage {
  protected readonly expand = inject(Expandable);

  readonly src = input.required<string>();
  readonly alt = input('');
}
