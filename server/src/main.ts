import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import express from 'express';
import { Server } from 'socket.io';
import { Hub, type QuizServer } from './hub.js';

const port = Number(process.env['PORT'] ?? 8080);
const webRoot = resolve(process.env['WEB_ROOT'] ?? 'web/dist/web/browser');

const app = express();
const http = createServer(app);
const io: QuizServer = new Server(http);

new Hub(io, { adminPassword: process.env['ADMIN_PASSWORD'] });

app.get('/keepalive', (_req, res) => {
  res.sendStatus(200);
});

if (existsSync(webRoot)) {
  app.use(express.static(webRoot));
  app.use((_req, res) => res.sendFile(join(webRoot, 'index.html')));
}

http.listen(port, () => console.log(`Gothic Quiz läuft auf Port ${port}`));
