import { BuzzerQuestion, ErrorQuestion, GeoguessrQuestion, GuessingQuestion, LocationQuestion, MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    static readonly clientId: string = '38c4dfef2a0e8aba637ea15987ba542f';

    static readonly whiteboardUrls: string[] = [
        '7f3bd35f-d647-4f10-9acd-56d34f446d82',  //Spieler 1 Url
        '8a647b8b-27da-4001-8b1a-b06fb978ff76',  //Spieler 2 Url
        '58bda352-1363-4b4a-8e17-2f9f8755a925',  //Spieler 3 Url
        'e561cc9f-cb97-4031-b8f8-a1b0ad875676'   //Spieler 4 Url
    ];

    static twitchAuth = {
        twitchApiUrl: 'https://api.twitch.tv/helix',
        clientId: new URL(window.location.href).searchParams.get('clientId'),
        oauthToken: new URL(window.location.href).searchParams.get('oauthToken'),
        channelId: new URL(window.location.href).searchParams.get('channelId')
    }

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/nPGvZ8yZlyY?controls=0&autoplay=1&mute=1&loop=1&vq=hd1080'; //Hintergrund Video

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
        "assets/katPictures/Kat 1.png",
        "assets/katPictures/Kat 2.png",
        "assets/katPictures/Kat 3.png",
        "assets/katPictures/Kat 4.png",
        "assets/katPictures/Kat 5.png",
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
    static readonly pictureInWhiteboardExample:GeoguessrQuestion = { // Milten 100
        question: "Male den Spruchrollen ihre Punkte in der richtigen Farbe!",
        searchPicture: "assets/geoguessr/searchPictures/Milten 100 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 100 Antwort.png",
        imgurLink: "https://i.imgur.com/CFAL2wV.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Lila,Grün,Lila,Grün','Lila,Gellb,Blau,Grün', 'Lila,Rot,Gelb,Grün', 'Rot,Grün,Gelb,Grün'],
        index: 0
    }

    /* Namenloser Held / Schule*/
    static readonly held1:BuzzerQuestion = { // Held 100
        question: "Erkenne das Monster!",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 100 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 100 Frage.png'
    }
    static readonly held2:BuzzerQuestion = { // Held 200
        question: "Finde den Fehler!",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 200 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 200 Frage.png'
    }
    static readonly held3:BuzzerQuestion = { // Held 300
        question: "Wer bin ich?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 300 Antwort.png"
    }
    static readonly held4:BuzzerQuestion = { // Held 400
        question: "Wie heißt die Waffe?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 400 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 400 Frage.png'
    }
    static readonly held5:BuzzerQuestion = { // Held 500
        question: "Wer sagt das?",
        kind: "Buzzer-Frage",
        audio: 'assets/buzzer/Kat 1 500 Frage.mp3',
        pictureQuestion: 'assets/buzzer/Kat 1 500 Frage.png',   
        video: 'https://www.youtube.com/embed/oNzID1HHxB4?controls=1&vq=hd1080&autoplay=0'
    }


    /* Diego*/
    static readonly diego1: GeoguessrQuestion= { // Diego 100
        question: "Welchen weg nimmst du um diese Falle zu überwinden? \n Schreibe die Zahlen der Felder auf!",
        searchPicture: "assets/guessing/pictures/Kat 2 100 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/guessing/pictures/Kat 2 100 Antwort.png",
        imgurLink: "https://i.imgur.com/baFcIlU.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    static readonly diego2: GeoguessrQuestion = { // Diego 200
        question: "Du verwandelst dich in eine Riesenratte. \n Wer greift dich an?",
        searchPicture: "assets/guessing/pictures/Kat 2 200 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/guessing/pictures/Kat 2 200 Antwort.png",
        imgurLink: "https://i.imgur.com/xpJps7L.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    static readonly diego3: GuessingQuestion= { // Diego 300
        question: "Wen suchen wir? Greg-Storys!",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 2 300 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 2 300 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego4: GuessingQuestion = { // Milten 100 TODO BONUS 
        question: "Bonusfrage von Snowfox! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/_NMcXH6iYFg?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/xPOHC6WvvV8?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }
    static readonly diego5: GuessingQuestion = { // Diego 500
        question: "Wie heißt die Quest?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 2 500 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 2 500 Frage.png',
        bonus: false,
        videoQuestion: ""
    }

    /* Lester */
    static readonly lester1:GuessingQuestion= { // Lester 100
        question: "Gold-Schätzfrage: Der Held bringt Bennet: Rods Zweihänder, \n 10 Stängel Sumpfkraut von Cifer und Marias Goldenen Teller. Er kauft von seinem Gold 1 mal Rohstahl. \n Wie viel Gold bleibt übrig?", //FRAGE TODO
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester2:GuessingQuestion = { // Lester 200
        question: "Wie viele Banditen befinden sich in Dexters Lager?", //FRAGE TODO
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 200 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Wie lange braucht Lares von seinem Standpunkt im Hafen bis zum Schiff?", //FRAGE TODO
        video: "https://www.youtube.com/embed/t3mqRoFXMaM?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 300 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester4: GuessingQuestion = { // Lester 400
        question: "Wie lange dauert das Intro von Gothic 2 inkl. Die Nacht des Raben?", //FEHLT NOCH! TODO
        video: "https://www.youtube.com/embed/f3oI_DxLoQI?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 400 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester5: GuessingQuestion = { // Lester 500 TODO BONUS
        question: "Ranger hat Attila gepackt! Aber Oh Nein! Attila gewinnt! \n Wie viele Hits braucht Attila bis Rangar down ist, wenn er nur Crittet?",
        video: "https://www.youtube.com/embed/woGkRiJoi4E?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 500 Frage.png',
        bonus: false,
        videoQuestion: ""
    }

    /* Milten / Games*/
    static readonly milten1:LocationQuestion = { // Milten 100
        question: "Wo ist der gesuchte Ort? (1)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 100 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 100 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly milten2:LocationQuestion = { // Milten 
        question: "Wo ist der gesuchte Ort? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 200 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly milten3: LocationQuestion = { // Milten 300
        question: "Wo ist der gesuchte Ort? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 300 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 300 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly milten4:LocationQuestion = { // Milten 400
        question: "Wo ist der gesuchte Ort? (4)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 400 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 400 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly milten5: LocationQuestion = { // Milten 500
        question: "Wo ist der gesuchte Ort? (5)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 500 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 500 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }

    /* Gorn */
    static readonly gorn1:VoicelineQuestion = { // Gorn 100
        question: "Was beschreibt Mimi hier?",
        voiceLine: "assets/voicelines/Kat 5 100 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "",
        bonus: false,
        pictureAnswer: "assets/voicelines/Kat 5 100 Antwort.png",
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200
        question: "Wer bietet mehr? „Banditen Gothic 1“", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 200 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Wahr oder Falsch!",
        video: "https://www.youtube.com/embed/Qu1A4dFzFDA?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/ZBFfr5nxlrs?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly gorn4:GeoguessrQuestion = { // Gorn 400
        question: "Ergänze zu allen Spruchrollen die jeweiligen Punkte in der richtigen Farbe!", 
        searchPicture: "assets/guessing/pictures/Kat 5 400 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/guessing/pictures/Kat 5 400 Antwort.png",
        imgurLink: "https://i.imgur.com/MnZN5wh.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Was ließt Xardas eigentlich den ganzen Tag?", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 500 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 500 Frage.png',
        bonus: false,
        videoQuestion: ""
    }

    /* static readonly held1:BuzzerQuestion = { // Held 100 BUZZER FRAGEW MIT VIDEOFRAGE
        question: "Erkenne das Monster!",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 100 Antwort.png",
        videoQuestion: 'https://www.youtube.com/embed/vdSBtFvMUz0?controls=1&vq=hd1080&autoplay=0'
    } */

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
