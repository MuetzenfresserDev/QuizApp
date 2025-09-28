import { BuzzerQuestion, ErrorQuestion, GeoguessrQuestion, GuessingQuestion, LocationQuestion, MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    static readonly clientId: string = '38c4dfef2a0e8aba637ea15987ba542f';
    static readonly imgurLinkImposter: string = "https://i.imgur.com/T6o5iN5.png"; //g1Minental

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

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/4wGesMK5C2g?controls=0&autoplay=1&mute=1&loop=1&vq=hd1080'; //Hintergrund Video

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

    static readonly katNames: string[] = [
        "Buzzer",
        "Schätzen",
        "Imposter",
        "GeoGuessr",
        "Random"
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
        videoQuestion: '',
        pictureQuestion: 'assets/buzzer/Kat 1 100 Frage.png'
    }
    static readonly held2:BuzzerQuestion = { // Held 200
        question: "Zitat! Wer sagt das?",
        kind: "Buzzer-Frage",
        audio: 'assets/buzzer/Kat 1 200 Frage.mp3',
        video: 'https://www.youtube.com/embed/5_Up1PGBuYw?controls=1&vq=hd1080&autoplay=0'
    }
    static readonly held3:BuzzerQuestion = { // Held 300
        question: "Welche ist die gesuchte Gemeinsamkeit all dieser Charaktere?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 300 Antwort.png",
        videoQuestion: 'https://www.youtube.com/embed/UffpszOOOAs?controls=1&vq=hd1080&autoplay=0'
    }
    static readonly held4:BuzzerQuestion = { // Held 400
        question: "Erkenne das Monster!",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 400 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 400 Frage.png',
    }
    static readonly held5:BuzzerQuestion = { // Held 500
        question: "Welche ist die gesuchte Gemeinsamkeit all dieser Charaktere?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 500 Antwort.png",
        videoQuestion: 'https://www.youtube.com/embed/pd1u8KeNFuM?controls=1&vq=hd1080&autoplay=0'
    }


    /* Diego*/
    static readonly diego1: GuessingQuestion= { // Diego 100
        question: "Wie lang ist der Truhencode von folgender Truhen, insgesamt?", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 2 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 2 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego2: GuessingQuestion = { // Diego 200
        question: "Wie lange dauert das Intro zu Gothic 3?", 
        video: "https://www.youtube.com/embed/reQC4FkrmqI?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 2 200 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego3: GuessingQuestion= { // Diego 300
        question: "Wie viele Lederbeutel liegen im Minental (G2) verstreut? (Laut Mondgesenge)", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 2 300 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 2 300 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego4: GuessingQuestion = { // Milten 100 TODO BONUS 
        question: "Wie lange läuft Saturas zum Portal?",
        video: "https://www.youtube.com/embed/GJ9-VBag8-c?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 2 400 Frage.png',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly diego5: GuessingQuestion = { // Diego 500
        question: "Wie viele Schwarze Goblins befinden sich hinter der Brücke zum Almanach, inkl. Höhle?", 
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
        question: "Wir spielen Imposter!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 100 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/0iL3lKnmFD0?controls=1&vq=hd1080&autoplay=0",
        imgurLink: "https://i.imgur.com/mK0mO1r.png",
        imposter: '7f3bd35f-d647-4f10-9acd-56d34f446d82',
        imgurLinkImposter: this.imgurLinkImposter
    }
    static readonly lester2:GuessingQuestion = { // Lester 200
        question: "Wir spielen Imposter!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 200 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/0iL3lKnmFD0?controls=1&vq=hd1080&autoplay=0",
        imgurLink: "https://i.imgur.com/73VsIDC.png",
        imposter: '58bda352-1363-4b4a-8e17-2f9f8755a925',
        imgurLinkImposter: this.imgurLinkImposter
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Wir spielen Imposter!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 300 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/0iL3lKnmFD0?controls=1&vq=hd1080&autoplay=0",
        imgurLink: "https://i.imgur.com/9jOatKa.png",
        imposter: '8a647b8b-27da-4001-8b1a-b06fb978ff76',
        imgurLinkImposter: this.imgurLinkImposter
    }
    static readonly lester4: GuessingQuestion = { // Lester 400
        question: "Wir spielen Imposter!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 400 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/0iL3lKnmFD0?controls=1&vq=hd1080&autoplay=0",
        imgurLink: "https://i.imgur.com/gPrjehA.png",
        imposter: '8a647b8b-27da-4001-8b1a-b06fb978ff76',
        imgurLinkImposter: this.imgurLinkImposter
    }
    static readonly lester5: GuessingQuestion = { // Lester 500 TODO BONUS
        question: "Wir spielen Imposter!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 500 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/0iL3lKnmFD0?controls=1&vq=hd1080&autoplay=0",
        imgurLink: "https://i.imgur.com/g5PTWyw.png",
        imposter: '7f3bd35f-d647-4f10-9acd-56d34f446d82',
        imgurLinkImposter: this.imgurLinkImposter
    }

    /* Milten / Games*/ //LOCATION ZUM SCHLUSS TODO
    static readonly milten1:LocationQuestion = { // Milten 100
        question: "Finde den gesuchten Ort! (1)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 100 Frage.png", //-> FÜLLEN WENN NORMALE BILDERSUCHE
        kind: "Location-Frage",
        markedPicture: "", //-> DAS HIER MUSS MAN EIG NICHT FÜLLEN
        imgurLink: "https://i.imgur.com/nG6KsRC.jpeg", //-> FÜLLEN WENN IN WHITEBOARD SOLL
        bonus: false,
        searchVideo: '',
        searchAudio: ''
    }
    static readonly milten2:LocationQuestion = { // Milten 
        question: "Mimi beschreibt euch den Ort… (2)",
        searchPicture: "", //-> FÜLLEN WENN NORMALE BILDERSUCHE
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Mimi_beschreibt_gg200.png", //-> DAS HIER MUSS MAN EIG NICHT FÜLLEN
        imgurLink: "", //-> FÜLLEN WENN IN WHITEBOARD SOLL
        bonus: false,
        searchVideo: '',
        searchAudio: 'assets/geoguessr/searchPictures/Kat 4 200 Frage.mp3'
    }
    static readonly milten3: LocationQuestion = { // Milten 300
        question: "Das Bild erscheint nur 2 Sekunden lang! (3)",
        searchPicture: "", //-> FÜLLEN WENN NORMALE BILDERSUCHE
        kind: "Location-Frage",
        markedPicture: "", //-> DAS HIER MUSS MAN EIG NICHT FÜLLEN
        imgurLink: "", //-> FÜLLEN WENN IN WHITEBOARD SOLL
        bonus: false,
        searchVideo: 'https://www.youtube.com/embed/UyhJQ-rgVMg?controls=1&vq=hd1080&autoplay=0',
        searchAudio: ''
    }
    static readonly milten4:LocationQuestion = { // Milten 400
        question: "Unscharf! (4)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 400 Frage.png", //-> FÜLLEN WENN NORMALE BILDERSUCHE
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 400 Antwort 2.png", //-> DAS HIER MUSS MAN EIG NICHT FÜLLEN
        imgurLink: "https://i.imgur.com/Hd1nTVO.png", //-> FÜLLEN WENN IN WHITEBOARD SOLL
        bonus: false,
        searchVideo: '',
        searchAudio: ''
    }
    static readonly milten5: LocationQuestion = { // Milten 500
        question: "Unscharf! (4)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 4 500 Frage.png", //-> FÜLLEN WENN NORMALE BILDERSUCHE
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 4 500 Antowrt2.png", //-> DAS HIER MUSS MAN EIG NICHT FÜLLEN
        imgurLink: "https://i.imgur.com/cJrOkVY.png", //-> FÜLLEN WENN IN WHITEBOARD SOLL
        bonus: false,
        searchVideo: '',
        searchAudio: ''
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "Welche Schreibweise ist richtig? Wähle!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200 -> BEISPIEL FÜR VIDEO GEO 
        question: "Wo liegt Bospars Bogen? Markiere!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 200 Frage.png',
        bonus: false,
        videoQuestion: "",
        imgurLink:'https://i.imgur.com/kwbv5of.png'
    } 
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Welche farblichen Punkte fehlen hier? Ergänze!", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 300 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 300 Frage.png',
        bonus: false,
        videoQuestion: "",
        imgurLink:'https://i.imgur.com/BnmTecc.jpeg'
    }
    static readonly gorn4:GuessingQuestion = { // Gorn 400
        question: "Wo ist der Fehler?", 
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 400 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 400 Frage.png',
        bonus: false,
        videoQuestion: "",
        imgurLink:'https://i.imgur.com/iikIgwq.jpeg'
    }
    
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Wahr oder Falsch", 
        video: "https://www.youtube.com/embed/f5dr3H5pvyk?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/4QeV7IuEw98?controls=1&vq=hd1080&autoplay=0"
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
