import { Component, inject, signal } from '@angular/core';
import { GameService } from '../core/game.service';

const IMAGE = 'assets/buzzer-sfx/scavenger.png';

/** Der Scavenger schnellt zum Buzzer-Sound vom rechten Rand ins Bild; der Hals endet dort am Bildschirmrand. */
@Component({
  selector: 'app-scavenger',
  template: `
    @if (game.scavengerPass() !== finished()) {
      @for (pass of [game.scavengerPass()]; track pass) {
        <img [src]="image" alt="" (animationend)="finished.set(pass)" />
      }
    }
  `,
  styles: `
    img {
      animation: scavenger-lunge 1.9s linear both;
      filter: drop-shadow(-10px 14px 22px rgba(0, 0, 0, 0.75));
      height: 32vh;
      pointer-events: none;
      position: fixed;
      right: 0;
      top: 24vh;
      transform-origin: 100% 60%;
      z-index: 15;
    }
    @keyframes scavenger-lunge {
      0% {
        animation-timing-function: cubic-bezier(0.15, 0.8, 0.3, 1);
        transform: translateX(105%) rotate(14deg);
      }
      14% {
        animation-timing-function: ease-in-out;
        transform: translateX(-7%) rotate(-7deg) scale(1.06);
      }
      22% {
        animation-timing-function: ease-in-out;
        transform: translateX(3%) rotate(3deg);
      }
      32% {
        animation-timing-function: ease-in-out;
        transform: translateX(-3%) rotate(-5deg) scale(1.03);
      }
      42% {
        animation-timing-function: ease-in-out;
        transform: translateX(1%) rotate(2deg);
      }
      52% {
        animation-timing-function: ease-in-out;
        transform: translateX(-2%) rotate(-4deg) scale(1.02);
      }
      76% {
        animation-timing-function: cubic-bezier(0.6, 0, 0.9, 0.4);
        transform: translateX(0) rotate(0deg);
      }
      100% {
        transform: translateX(105%) rotate(12deg);
      }
    }
  `,
})
export class Scavenger {
  protected readonly game = inject(GameService);
  protected readonly image = IMAGE;
  protected readonly finished = signal(0);

  constructor() {
    // Vorladen, sonst fehlt der Kopf beim ersten Buzzer.
    new Image().src = IMAGE;
  }
}
