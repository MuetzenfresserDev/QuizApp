# Gothic Quiz

Jeopardy-artige Spielshow für einen Admin und bis zu vier Spieler. Alles läuft in einer App: Whiteboard, Buzzer und Geo-Karte sind eingebaut und synchronisieren sich per WebSocket.

## Starten

```bash
npm install
npm run dev
```

Das öffnet die App auf `http://localhost:4200`, der Server läuft auf Port 8080.

Für den Betrieb:

```bash
npm run build
npm start
```

Dann läuft alles auf einem Port, standardmäßig 8080. Mit Docker geht das über `docker compose up --build`.

| Variable | Bedeutung |
| --- | --- |
| `PORT` | Port des Servers |
| `ADMIN_PASSWORD` | Passwort zum Erstellen eines Spiels. Sollte öffentlich immer gesetzt sein, sonst kann jeder ein Spiel anlegen und die Lösungen vorab ansehen. |

## Aufbau

| Ordner | Inhalt |
| --- | --- |
| `shared/` | Typen und Konstanten für Server und Client |
| `server/` | Express und Socket.IO. Die Regeln liegen in `game.ts`, die Fragen in `catalog.ts` |
| `web/` | Angular-Client |

Der Server entscheidet alles und schickt jedem Teilnehmer nur, was er gerade sehen darf. Lösungen, Karten-Ziele und fremde Whiteboards verlassen den Server erst nach dem Aufdecken. Das gilt auch für den Admin, weil seine Ansicht gestreamt wird.

Laufende Spiele liegen im Arbeitsspeicher. Ein Neustart des Servers beendet sie.

## Fragen ändern

Der Admin erstellt das Quiz im Browser unter `/editor` und schickt die heruntergeladene Datei. Sie enthält alle Fragen, Bilder und Audios. Der Entwurf wird dabei im Browser gespeichert.

Einbinden:

```bash
npm run import-quiz gothic-quiz.zip
```

Das prüft das Paket und ersetzt [server/src/quiz.json](server/src/quiz.json) sowie `web/public/assets/quiz`. Ist es unvollständig, listet der Befehl die offenen Punkte auf und ändert nichts. Danach committen und deployen.

Das aktuelle Quiz lässt sich als Vorlage für den Editor exportieren:

```bash
npm run export-quiz gothic-quiz.zip
```

## Streaming

Host-Kamera und die vier Spieler-Kameras haben in beiden Ansichten feste Platzhalter. In OBS legst du die Kameras einfach darüber. Die Punkte-Knöpfe des Admins liegen im Kamerabild, die Zuschauer sehen sie dadurch nicht. Für stabile Positionen die Ansicht immer in derselben Fenstergröße aufnehmen.

Bilder, Videos, Karte und Whiteboards lassen sich über `Groß` oder per Klick auf die ganze Bühne ziehen, `Esc` verkleinert wieder. Das gilt nur für den eigenen Bildschirm: Was der Admin vergrößert, sehen also die Stream-Zuschauer, nicht die anderen Spieler.
