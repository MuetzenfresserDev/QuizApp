import { BuzzerQuestion, ErrorQuestion, GeoguessrQuestion, GuessingQuestion, LocationQuestion, MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    static readonly clientId: string = '38c4dfef2a0e8aba637ea15987ba542f';

    static readonly whiteboardUrls: string[] = [
        '7f3bd35f-d647-4f10-9acd-56d34f446d82',  //Spieler 1 Url
        '8a647b8b-27da-4001-8b1a-b06fb978ff76',  //Spieler 2 Url
        '58bda352-1363-4b4a-8e17-2f9f8755a925',  //Spieler 3 Url
        'e561cc9f-cb97-4031-b8f8-a1b0ad875676'   //Spieler 4 Url
      ];

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/dRnH2cU3_m4?controls=0&autoplay=1&mute=1&playlist=dRnH2cU3_m4&loop=1'; //Hintergrund Video

    static readonly videoSize = {width: '900', height: '506'};

    static readonly pictureSize = {width: '900', height: '506'};
    static readonly errorPictureSize = {width: '900', height: '506'};
    static readonly correctedPictureSize = {width: '900', height: '506'}

    static readonly geoImgurPics = {
        g1Minental: 'https://i.imgur.com/PvDcX8Z.png',
        khorinis: 'https://i.imgur.com/S2HSbb1.jpg',
        g2Minental: 'https://i.imgur.com/yEO2dTJ.jpg',
        g3: 'https://i.imgur.com/js2bFS1.jpg'
    }

    static readonly timers = {
        multivoice: 30,
        errorgeo: 30,
        guess: 30
    };

    static readonly katPictures: string[] = [
        "assets/katPictures/namelessBorder.png",
        "assets/katPictures/diegoBorder.png",
        "assets/katPictures/lesterBorder.png",
        "assets/katPictures/miltenBorder.png",
        "assets/katPictures/gornBorder.png",
    ];

    static readonly multiplechoiceExample:  MultiplechoiceQuestion = {
        question: "test Frage",
        options: {
            option1: "A: 1111",
            option2: "B: 2222",
            option3: "C: 3333",
            option4: "D: 4444",
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: 'D: 4444',
        bonus: true
    }  
    static readonly voicelineExample: VoicelineQuestion = {
        question: "",
        voiceLine: "",
        kind: "Voiceline-Fragen",
        correctAnswer: "",
        bonus: false
    }
    static readonly geoExample: GeoguessrQuestion = {
        question: "",
        searchPicture: "",
        kind: "",
        markedPicture: "",
        imgurLink: "",
        bonus: false
    }
    static readonly guessExample:GuessingQuestion = {
        question: "Sortiere die folgenden Waffen absteigend nach der benötigten Stärke (höchster Wert zuerst). \n Schwere Erz-Schlachtklinge, Rubinklinge, Brutale Orkaxt, \n Edles Schwert, Leichte Orkaxt",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Schwere Erz-Schlachtklinge (Benötigt 140; Schaden: 160) \n Brutale Orkaxt (Benötigt 100; Schaden: 80) \n Rubinklinge  (Benötigt 90; Schaden: 100) \n Leichte Orkaxt (Benötigt 70; Schaden: 50) \n Edles Schwert (Benötigt 50; Schaden: 60)",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly buzzerExample: BuzzerQuestion = {
        question: "Irgend eine Frage",
        kind: "Buzzer-Frage"
    }

    /* Namenloser Held */
    static readonly held1: GuessingQuestion = { // Held 100
        question: "„Das ist ja ekelhaft!“ - So würden manche Bewohner der Insel Khorinis Fleischwanzen beschreiben. \n Aber wie viele Beine haben diese?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Held 100 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held2:GuessingQuestion = { // Held 200
        question: "Der Held schlägt Valentino mit einem Schlag zu Boden, während dieser Vatras zuhört (14 Uhr). \n Wieviel Strafe muss er zahlen?",
        video: "https://www.youtube.com/embed/5GCKAgLNVZc?si?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Zuschauer Frage",
        video: "https://www.youtube.com/embed/nDsfgeZLNZY?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/qqxHyl5qvyo?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held4:GuessingQuestion = { // Held 400 Raff ich ned
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/kkIdaQ1UuPA?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/MiR4zFJiHgQ?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held5:GuessingQuestion = { // Held 500
        question: "Der Held lässt seine Waffe fallen. In welche Richtung zeigt sie? (Uhrzeit)",
        video: "https://www.youtube.com/embed/v7voZ6bNUl4?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: "assets/guessing/pictures/Held 500 Frage.jpg",
        bonus: false,
        videoQuestion: ""
    }


    /* Diego */
    static readonly diego1: GuessingQuestion = { // Diego 100
        question: "Bonusfrage von Jase! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/mAPPopsAPSo?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/FYJgkqWqr0g?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly diego2:LocationQuestion = { // Diego 200
        question: "Diego hat sich verlaufen. Wo befindet er sich? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Diego 200 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 200 Antwort.jpg",
        imgurLink: this.geoImgurPics.g3, //khorinis
        bonus: false,
    }
    static readonly diego3:GuessingQuestion = { // Diego 300
        question: "Was sagt der erste Gardist wenn er einen Drachen erblickt?",
        video: "https://www.youtube.com/embed/KjZq4nQsbsk?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/Fe4mOTZ8_z8?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly diego4: GeoguessrQuestion= { // Diego 400 NICHT FERTIG!
        question: "Welcher dieser Schalter ist der richtige, um sicher in die nächste Kammer zu gelangen?",
        searchPicture: "assets/guessing/pictures/Diego_400_Frage_Hell_mit_markierung.jpg",
        kind: "Geo-Frage",
        markedPicture: "",
        imgurLink: "https://i.imgur.com/Dd1RH1Q.jpg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: 'https://www.youtube.com/embed/dy49vKjFnUM?controls=1&vq=hd1080&autoplay=0'
    }
    static readonly diego5: GuessingQuestion = { // Diego 500
        question: "Ein unbekannter Jäger hinterließ eine Tagebuchseite in der Trollschlucht, in der er stolz den Plan verkündigt, einen Troll zu töten. \n Dies möchte er mit einer Monster-Schrumpfen-Spruchrolle schaffen. Doch wie viel hat er für diese Bezahlt?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Diego 500 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }

    /* Lester */
    static readonly lester1:GuessingQuestion = { // Lester 100
        question: "Lester bringt den Helden zu Cor Kalom. Wie lange dauert das?",
        video: "https://www.youtube.com/embed/fiecWCU6dd0?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester2: GuessingQuestion = { // Lester 200
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/YApoRqx2rYQ?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/dNLwjbv8rrY?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly lester3:BuzzerQuestion = { // Lester 300
            question: "Edgor sagt es läuft ziemlich mies. Nenne einen der 3 Gründe, warum es so mies läuft.",
            kind: "Buzzer-Frage",
            video: "https://www.youtube.com/embed/oYVQipRlv2Q?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly lester4:GuessingQuestion = { // Lester 400 TODO
        question: "Bonusfrage von LordPappnase! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/txrgV_mfnSs?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/txrgV_mfnSs?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly lester5: LocationQuestion = { // Lester 500
        question: "Lester hat sich beim Verstärkung holen verlaufen. Wo befindet er sich? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Lester 500 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Lester 500 Antwort.jpg",
        imgurLink: this.geoImgurPics.g3, //khorinis
        bonus: false,
    }

    /* Milten */
    static readonly milten1:GuessingQuestion= { // Milten 100
        question: "Bonusfrage von Crazydogaming! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/8nSYNEXpXGw?si?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/xdMw3IZsUsA?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }
    static readonly milten2:GuessingQuestion = { // Milten 200
        question: "Milten kontrolliert die Innos-Schreine auf Spenden. Hilf ihm, sich die Items am Schrein von Lobarts Hof zu merken! \n Nenne 2 verschiedene!",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "1 Wasser, 1 Apfel, 1 Gold, 2 Fischsuppen und 2 Blauflieder (eine Kerze)",
        picture: "assets/guessing/pictures/Milten 200 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly milten3: BuzzerQuestion = { // Milten 300
        question: "Wer genau spricht diese Voiceline?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/r0uWDpwtfyQ?controls=1&vq=hd1080&autoplay=0",
        audio: "assets/voicelines/Milten 300 Frage.mp3"
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "„Sie sind alle tot, alle… tot!“ Milten ist der letzte Überlebende der Feuermagier. Zur Rache setzt er Kontrolle ein! \n Wieviele Sekunden dauert es, bis dies bei Bloodwin funktioniert? (Kap. 4) G1",
        video: "https://www.youtube.com/embed/88xCmjHZQGc?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Milten arbeitet für Xardas und muss herausfinden, um welche Zauber es sich hierbei handelt. Hilf ihm!",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "assets/guessing/pictures/Milten 500 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/tkVtlFsQ0HQ?controls=1&vq=hd1080&autoplay=0"
    }

    /* Gorn */
    static readonly gorn1:BuzzerQuestion = { // Gorn 100
        question: "Wer genau spricht diese Voiceline?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/jKCohIY_gYc?controls=1&vq=hd1080&autoplay=0",
        audio: "assets/voicelines/Gorn 100 Frage.mp3"
    }
    static readonly gorn2:LocationQuestion = { // Gorn 200 ->
        question: "Gorn hat sich verlaufen. Wo befindet er sich? (1)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 200 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.jpg",
        imgurLink: this.geoImgurPics.g3, //khorinis
        bonus: false,
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Der Paladin Gerold vergleicht Gorns Stärke mit einem Tier. Welches?",
        video: "https://www.youtube.com/embed/XVkg47fA__8?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly gorn4:BuzzerQuestion = { // Gorn 400
        question: "Wer bin ich? (G1/G2)",
        kind: "Buzzer-Frage",
        picture:"assets/buzzer/Gorn 400 Antwort.jpg",
        audio: "assets/voicelines/Gorn 400 Frage.mp3"
    }
    static readonly gorn5: BuzzerQuestion = { // Gorn 500
        question: "Was tut dieser Ork hier",
        kind: "Buzzer-Frage",
        pictureQuestion:"assets/buzzer/Gorn 500 Frage.jpg",
        video: "https://www.youtube.com/embed/8-gOEDzaxws?controls=1&vq=hd1080&autoplay=0"
    }

    /* static readonly diego4: BuzzerQuestion= { // Diego 400
        question: "Wer bin ich?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Diego 400 Antwort.jpg"
    } */

    /* static readonly milten2:BuzzerQuestion = { // Milten 200
        question: "Wer genau spricht diese Voiceline?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/0czM5vVBA8Y?controls=1&vq=hd1080&autoplay=0",
        audio: "assets/voicelines/Milten 200 Frage.mp3"
    } */

    /* static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Bonusfrage von Hochkönig! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/rHq6i_3_9f4?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/LgalFvnQfiU?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    } */

    /* static readonly gorn5: VoicelineQuestion = { // Gorn 500
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/Gorn 500 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/FoJRMyNRzRc?controls=1&vq=hd1080&autoplay=0",
        bonus: false
    } */

    /* static readonly gorn2:LocationQuestion = { // Gorn 200
        question: "Gorn hat sich verlaufen. Wo befindet er sich? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 200 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    } */

    /* static readonly held4:ErrorQuestion = { // Held 400
        question: "Finde die Unterschiede in den Bildern",
        errorPicture: "assets/errors/errorPictures/Held 400 Frage.jpg",
        kind: "Fehlersuche-Frage",
        correctedPicture: "assets/errors/correctedPictures/Held 400 Antwort.jpg",
        imgurLink: "https://i.imgur.com/h6XyXRx.jpg",   //gleiche wie errorPicture um darauf dann Fehler zu Markieren.
        bonus: false
    } */

    /* nameless */ static readonly questions1: any[]  = [this.held1, this.held2, this.held3, this.held4, this.held5]
    /* diego */ static readonly questions2: any[] = [this.diego1, this.diego2, this.diego3, this.diego4, this.diego5]
    /* lester */ static readonly questions3: any[] = [this.lester1, this.lester2, this.lester3, this.lester4, this.lester5]
    /* milten */ static readonly questions4: any[] = [this.milten1, this.milten2, this.milten3, this.milten4, this.milten5]
    /* gorn */ static readonly questions5: any[] = [this.gorn1,this.gorn2, this.gorn3,this.gorn4, this.gorn5]

    static readonly questions = {
        questions1: this.questions1,
        questions2: this.questions2,
        questions3: this.questions3,
        questions4: this.questions4,
        questions5: this.questions5
    }
}
