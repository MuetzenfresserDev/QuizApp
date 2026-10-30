import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../core/game.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  template: `
    <main>
      <h1>Gothic Quizshow</h1>
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
    h1 {
      color: var(--gold-strong);
      font-size: 2.6rem;
      text-align: center;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
      max-width: 100%;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      max-width: 100%;
      padding: 1.5rem;
      width: 340px;
    }
    label {
      color: var(--muted);
      display: grid;
      gap: 0.3rem;
    }
    .error {
      color: #ff9a8a;
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

  private async enter(work: () => Promise<string>): Promise<void> {
    this.error.set('');
    this.game.notice.set('');
    try {
      await this.router.navigate(['/game', await work()]);
    } catch (error) {
      this.error.set((error as Error).message);
    }
  }
}
