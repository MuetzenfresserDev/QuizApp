import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, RouterLink],
  template: `
    <main>
      <header>
        <p class="eyebrow"></p>
        <h1>Gothic Quiz</h1>
      </header>
      @if (error() || game.notice()) {
        <p class="error" role="alert">{{ error() || game.notice() }}</p>
      }
      <div class="cards">
        <form class="panel" (ngSubmit)="join()">
          <h2>Teilnehmen</h2>
          <label>Spiel-Code <input name="code" [(ngModel)]="joinCode" maxlength="4" inputmode="numeric" required /></label>
          <label>Dein Name <input name="name" [(ngModel)]="name" maxlength="30" required /></label>
          <button class="primary" type="submit">Beitreten</button>
        </form>
        <form class="panel" (ngSubmit)="create()">
          <h2>Spiel erstellen</h2>
          <label>Dein Name <input name="host" [(ngModel)]="hostName" maxlength="30" required /></label>
          <label>Admin-Passwort <input name="password" type="password" [(ngModel)]="password" /></label>
          <button type="submit">Als Admin erstellen</button>
        </form>
      </div>
      <a class="link" routerLink="/editor">Fragen für ein neues Quiz erstellen</a>
    </main>
  `,
  styles: `
    main {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
    }
    header {
      animation: rise-in 0.6s ease-out backwards;
      text-align: center;
    }
    .eyebrow {
      color: var(--muted);
      font-size: 0.9rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
    }
    h1 {
      background: var(--gold-gradient);
      background-clip: text;
      color: transparent;
      font-size: clamp(2.4rem, 6vw, 4.5rem);
      line-height: 1.1;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
      max-width: 100%;
    }
    form {
      animation: rise-in 0.6s ease-out 0.1s backwards;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      max-width: 100%;
      padding: 1.75rem;
      width: 360px;
    }
    label {
      color: var(--muted);
      display: grid;
      gap: 0.3rem;
    }
    .link {
      color: var(--gold-strong);
    }
    .error {
      background: rgba(210, 69, 47, 0.2);
      border: 1px solid var(--danger);
      border-radius: var(--radius);
      color: #ffc2b6;
      padding: 0.5rem 1rem;
    }
  `,
})
export class HomePage implements OnInit {
  protected readonly game = inject(GameService);
  private readonly router = inject(Router);

  readonly code = input<string>();

  protected joinCode = '';
  protected name = localStorage.getItem('quiz:name') ?? '';
  protected hostName = localStorage.getItem('quiz:host') ?? '';
  protected password = '';
  protected readonly error = signal('');

  ngOnInit(): void {
    this.joinCode = this.code() ?? '';
  }

  protected async join(): Promise<void> {
    localStorage.setItem('quiz:name', this.name);
    await this.enter(() => this.game.join(this.joinCode.trim(), this.name));
  }

  protected async create(): Promise<void> {
    localStorage.setItem('quiz:host', this.hostName);
    await this.enter(() => this.game.create(this.hostName, this.password));
  }

  private async enter(work: () => Promise<void>): Promise<void> {
    this.error.set('');
    this.game.notice.set('');
    try {
      await work();
      await this.router.navigate(['/game']);
    } catch (error) {
      this.error.set((error as Error).message);
    }
  }
}
