import type { MediaSet, Point, QuestionMode } from '@quiz/shared';

/**
 * Fragenkatalog. Liegt nur auf dem Server, damit Lösungen nicht im Client-Bundle landen.
 *
 * - whiteboard deckt die alten Typen Schätz-, Fehler-, Geo-, Multiple-Choice- und Voiceline-Frage ab.
 * - map.goal ist in Pixeln der alten 850x592-Karte angegeben.
 * - imposter: Der Spieler auf diesem Platz (0-3) bekommt ein anderes Whiteboard-Bild.
 */
export interface QuestionDef {
  mode: QuestionMode;
  prompt: string;
  bonus?: boolean;
  options?: string[];
  media?: MediaSet;
  answer: MediaSet;
  boardImage?: string;
  imposter?: { slot: number; boardImage: string };
  map?: { image: string; goal: Point };
}

export interface CategoryDef {
  name: string;
  image: string;
  questions: QuestionDef[];
}

export const CATALOG: CategoryDef[] = [
  {
    name: "Buzzer",
    image: "assets/katPictures/Kat 1.png",
    questions: [
      {
        mode: "buzzer",
        prompt: "Wer ist Ulmar?",
        answer: {
          image: "assets/buzzer/Kat 1 100 Antwort.png"
        }
      },
      {
        mode: "buzzer",
        prompt: "Wie heißt dieses Item?",
        media: {
          image: "assets/buzzer/Kat 1 200 Frage.png"
        },
        answer: {
          image: "assets/buzzer/Kat 1 200 Antwort.png"
        }
      },
      {
        mode: "buzzer",
        prompt: "Wer hat das Gesagt?",
        media: {
          audio: "assets/buzzer/Kat 1 300 Frage.mp3"
        },
        answer: {
          video: "https://www.youtube.com/embed/52FJSZRHzDM?controls=1&vq=hd1080&autoplay=0"
        }
      },
      {
        mode: "buzzer",
        prompt: "Über welchen Ort geht es hier?",
        media: {
          image: "assets/buzzer/Kat 1 400 Frage.png"
        },
        answer: {
          image: "assets/buzzer/Kat 1 400 Antwort.png"
        }
      },
      {
        mode: "buzzer",
        prompt: "Über Welchen NPC schreibt der Held hier?",
        media: {
          image: "assets/buzzer/Kat 1 500 Frage.png"
        },
        answer: {
          image: "assets/buzzer/Kat 1 500 Antwort.png"
        }
      }
    ]
  },
  {
    name: "Schätzfragen",
    image: "assets/katPictures/Kat 2.png",
    questions: [
      {
        mode: "whiteboard",
        prompt: "Wie viel sind die Items im Verkauf an Sharky wert?\n(erstes mal Verkaufen) (Novize Schwierigkeit)",
        media: {
          image: "assets/guessing/pictures/Kat 2 100 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 2 100 Antwort.png"
        }
      },
      {
        mode: "whiteboard",
        prompt: "Bonusfrage von RPGKurga! -> 500 Gold Frage",
        bonus: true,
        media: {
          video: "https://www.youtube.com/embed/G8M36jXrA_4?controls=1&vq=hd1080&autoplay=0"
        },
        answer: {
          video: "https://www.youtube.com/embed/EcbdKhbwQo4?controls=1&vq=hd1080&autoplay=0"
        }
      },
      {
        mode: "whiteboard",
        prompt: "Wie lange dauert der Weg mit Mordrag zum Neuen Lager?\nAlle Gegner leben noch (Schwierigkeit Novize)",
        media: {
          image: "assets/guessing/pictures/Kat 2 300 Frage.png"
        },
        answer: {
          video: "https://www.youtube.com/embed/C5O-YRe9VnQ?controls=1&vq=hd1080&autoplay=0"
        }
      },
      {
        mode: "whiteboard",
        prompt: "Wie lange dauern die Credits?",
        media: {
          image: "assets/guessing/pictures/Kat 2 400 Frage.png"
        },
        answer: {
          video: "https://www.youtube.com/embed/xxrr0BcMHd0?controls=1&vq=hd1080&autoplay=0"
        }
      },
      {
        mode: "whiteboard",
        prompt: "Wie lange fliegen wir von dieser Position gerade durch zum anderen Rand der Barriere?",
        media: {
          image: "assets/guessing/pictures/Kat 2 500 Frage.png"
        },
        answer: {
          video: "https://www.youtube.com/embed/ske_EqN0QkE?controls=1&vq=hd1080&autoplay=0"
        }
      }
    ]
  },
  {
    name: "Unterschiede!",
    image: "assets/katPictures/Kat 3.png",
    questions: [
      {
        mode: "whiteboard",
        prompt: "Welcher dieser Orte zeigt das Remakebild?",
        media: {
          image: "assets/guessing/pictures/Kat 3 100 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 3 100 Antwort.png"
        },
        boardImage: "https://i.imgur.com/9FehfVH.jpeg"
      },
      {
        mode: "whiteboard",
        prompt: "Welcher dieser Orte zeigt das Originalbild?",
        media: {
          image: "assets/guessing/pictures/Kat 3 200 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 3 200 Antwort.png"
        },
        boardImage: "https://i.imgur.com/OEm9Tiw.jpeg"
      },
      {
        mode: "whiteboard",
        prompt: "Verbinde diese Items mit dem richtigen Bild!",
        media: {
          image: "assets/guessing/pictures/Kat 3 300 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 3 300 Antwort.png"
        },
        boardImage: "https://i.imgur.com/KwiT9yK.png"
      },
      {
        mode: "whiteboard",
        prompt: "Bonusfrage von Jorgenson -> 500 Gold Frage",
        bonus: true,
        media: {
          video: "https://www.youtube.com/embed/ITxSKZ90Vb4?controls=1&vq=hd1080&autoplay=0"
        },
        answer: {
          video: "https://www.youtube.com/embed/kh4KrT0o0cI?controls=1&vq=hd1080&autoplay=0"
        }
      },
      {
        mode: "whiteboard",
        prompt: "Verbinde diese Orte mit der Location auf der Map!",
        media: {
          image: "assets/guessing/pictures/Kat 3 500 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 3 500 Antwort.png"
        },
        boardImage: "https://i.imgur.com/pkkEkDb.jpeg"
      }
    ]
  },
  {
    name: "GeoGuessr",
    image: "assets/katPictures/Kat 4.png",
    questions: [
      {
        mode: "map",
        prompt: "Markiere den Ort... (1)",
        media: {
          image: "assets/geoguessr/searchPictures/Kat 4 100 Frage.png"
        },
        answer: {},
        map: {
          image: "assets/geo/karte_der_Kolonie_remake.png",
          goal: {
            x: 299,
            y: 424
          }
        }
      },
      {
        mode: "map",
        prompt: "Markiere den Ort... (2)",
        media: {
          image: "assets/geoguessr/searchPictures/Kat 4 200 Frage.png"
        },
        answer: {},
        map: {
          image: "assets/geo/karte_der_Kolonie_remake.png",
          goal: {
            x: 182,
            y: 196
          }
        }
      },
      {
        mode: "map",
        prompt: "Markiere den Ort... (3)",
        media: {
          image: "assets/geoguessr/searchPictures/Kat 4 300 Frage.png"
        },
        answer: {},
        map: {
          image: "assets/geo/karte_der_Kolonie_remake.png",
          goal: {
            x: 427,
            y: 144
          }
        }
      },
      {
        mode: "map",
        prompt: "Markiere den Ort... (4)",
        media: {
          image: "assets/geoguessr/searchPictures/Kat 4 400 Frage.png"
        },
        answer: {},
        map: {
          image: "assets/geo/karte_der_Kolonie_remake.png",
          goal: {
            x: 223,
            y: 214
          }
        }
      },
      {
        mode: "map",
        prompt: "Markiere den Ort... (5)",
        media: {
          image: "assets/geoguessr/searchPictures/Kat 4 500 Frage.png"
        },
        answer: {},
        map: {
          image: "assets/geo/karte_der_Kolonie_remake.png",
          goal: {
            x: 308,
            y: 276
          }
        }
      }
    ]
  },
  {
    name: "Random",
    image: "assets/katPictures/Kat 5.png",
    questions: [
      {
        mode: "whiteboard",
        prompt: "Erkenne die Fehler!",
        media: {
          image: "assets/guessing/pictures/Kat 5 100 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 5 100 Antwort.png"
        },
        boardImage: "https://i.imgur.com/4bG3xsB.jpeg"
      },
      {
        mode: "whiteboard",
        prompt: "Welche Waffe ist Stärker?",
        media: {
          image: "assets/guessing/pictures/Kat 5 200 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 5 200 Antwort.png"
        },
        boardImage: "https://i.imgur.com/tDpruSl.png"
      },
      {
        mode: "whiteboard",
        prompt: "Wahr oder Falsch?",
        media: {
          video: "https://www.youtube.com/embed/YfDo1nSzplg?controls=1&vq=hd1080&autoplay=0"
        },
        answer: {
          video: "https://www.youtube.com/embed/oiW0r6JCFK4?controls=1&vq=hd1080&autoplay=0"
        }
      },
      {
        mode: "whiteboard",
        prompt: "Welche Farben haben diese Zauber?",
        media: {
          image: "assets/guessing/pictures/Kat 5 400 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 5 400 Antwort.png"
        },
        boardImage: "https://i.imgur.com/dozOUCZ.png"
      },
      {
        mode: "whiteboard",
        prompt: "Wie heißt dieses Buch?",
        media: {
          image: "assets/guessing/pictures/Kat 5 500 Frage.png"
        },
        answer: {
          image: "assets/guessing/pictures/Kat 5 500 Antwort.png"
        },
        boardImage: "https://i.imgur.com/9oyMBJs.png"
      }
    ]
  }
];
