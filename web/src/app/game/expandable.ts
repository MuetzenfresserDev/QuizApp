import { Directive, signal } from '@angular/core';

/**
 * Lässt ein Element lokal die ganze Bühne ausfüllen. Es bleibt im DOM, damit
 * YouTube-Player und Canvas beim Umschalten nicht neu starten.
 */
@Directive({
  selector: '[appExpandable]',
  host: {
    '[class.big-stage]': 'big()',
    '(document:keydown.escape)': 'big.set(false)',
  },
})
export class Expandable {
  readonly big = signal(false);

  toggle(): void {
    this.big.update((value) => !value);
  }
}
