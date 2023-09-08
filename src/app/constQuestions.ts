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
        g2Minental: 'https://i.imgur.com/yEO2dTJ.jpg'
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
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/UK3vtT-KzqY?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/Mrin7n7obsU?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held2:GuessingQuestion = { // Held 200
        question: "Ohje… Ein Steckbrief! Und ein hohes Kopfgeld. Welche Charaktere erkennen unseren Helden wieder? ",
        video: "https://www.youtube.com/embed/YeHeZPoS1bE?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Noch so ein Spinner! Wer hat außer dem Helden in der Stadt auch noch von den Drachen berichtet?",
        video: "https://www.youtube.com/embed/UNl137qDIqU?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held4:GuessingQuestion = { // Held 400 Raff ich ned
        question: "Bei welchem seiner seitliche Fackelschritte fällt der Held links runter?",
        video: "https://www.youtube.com/embed/6YsonD-oLFY?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 400 Frage.jpg',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held5:GuessingQuestion = { // Held 500
        question: "Wie viel Gewicht hatte das Gold, für das Bergmar Burggraf zu Westfeld die Bergfestung aufgegeben hatte?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Held 500 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }


    /* Diego */
    static readonly diego1: GuessingQuestion = { // Diego 100
        question: "DndR: Diego geht Klauen. Er beklaut im Taschendiebstahl … Daron, Hakon, Harad, Kardif und Albrecht. \n Wieviel Gold hat er beisammen?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Daron 80, Hakon 65, Harad 35, Kardif 85, Albrecht 160 – Summe: 425 Gold",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego2:BuzzerQuestion = { // Diego 200
        question: "Warum haut Coragon Valentino um?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/r9AQX3rBd5g?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly diego3:GuessingQuestion = { // Diego 300
        question: "Welche Auswahl an Namen kann bei den Dexter Banditen verfügbar sein",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Diego 300 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego4: BuzzerQuestion= { // Diego 400
        question: "Wer bin ich?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Diego 400 Antwort.jpg"
    }
    static readonly diego5: LocationQuestion = { // Diego 500
        question: "Diego hat sich verlaufen. Wo befindet er sich? (1)",
        searchPicture: "assets/geoguessr/searchPictures/GeoG 5 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/GeoG 5 Antwort.jpg",
        imgurLink: this.geoImgurPics.khorinis, //khorinis
        bonus: false,
    }

    /* Lester */
    static readonly lester1:LocationQuestion = { // Lester 100
        question: "Lester hat sich verlaufen. Wo befindet er sich? (3)",
        searchPicture: "assets/geoguessr/searchPictures/GeoG 2 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/GeoG 2 Antwort.jpg",
        imgurLink: this.geoImgurPics.g1Minental, //khorinis
        bonus: false,
    }
    static readonly lester2: GuessingQuestion = { // Lester 200
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/c9ukFxymuqk?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/h1OFGLDftxM?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Bonusfrage von Snowgen! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/WNVfU5rUPC4?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/kxVI8uF05c4?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }
    static readonly lester4:GuessingQuestion = { // Lester 400
        question: "Wie heißt dieser Charakter?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Lester 400 Antwort.jpg",
        pictureQuestion: 'assets/guessing/pictures/Lester 400 Frage.jpg',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester5: GuessingQuestion = { // Lester 500
        question: "Im letzten Quiz konnten wir klären, welchen Weg Pedro nahm, um das Auge Innos zu den Feinden zu bringen. \n Heute müssen wir klären, wie lange er dafür gebraucht hat! \n Gib uns die Zeit an!",
        video: "https://www.youtube.com/embed/txrgV_mfnSs?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    

    /* Milten */
    static readonly milten1:BuzzerQuestion = { // Milten 100
        question: "Was genau hört man hier?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/iMbgh5B40Mw?controls=1&vq=hd1080&autoplay=0",
        audio: "assets/voicelines/Milten 100 Frage.mp3"
    }
    static readonly milten2:BuzzerQuestion = { // Milten 200
        question: "Wer genau spricht diese Voiceline?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/0czM5vVBA8Y?controls=1&vq=hd1080&autoplay=0",
        audio: "assets/voicelines/Milten 200 Frage.mp3"
    }
    static readonly milten3: GuessingQuestion = { // Milten 300
        question: "Babo schenkt dem Helden einen Kampfstab. Dabei erzählt er ihm auch, wie lange er schon im Kloster lebt. \n Wie lang ist es?",
        video: "https://www.youtube.com/embed/BmE_jg7Qv18?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "4 Wochen",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "Fülle die Lücken (nur rot)",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "assets/guessing/pictures/Milten 400 Antwort.jpg",
        pictureQuestion: 'assets/guessing/pictures/Milten 400 Frage.jpg',
        bonus: false,
        videoQuestion: ""
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Laut Pedro dürfen die Novizen der Feuermagier zwei Dinge NIEMALS tun. Welche sind das?",
        video: "https://www.youtube.com/embed/EHf9J0YjW_U?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "Bonusfrage von Balnazza! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/O2sM8EEW1dE?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/snslBz1gpeI?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200
        question: "Sekob der halte Geizhals ist schon seit Wochen überfällig mit seiner Pacht. \n Na, ein Glück kann der Held ihn davon überzeugen zu zahlen! Er legt sogar einen Bonus drauf! \n Wie hoch ist seine Pacht eigentlich, und wie hoch ist der versprochene Bonus, wenn man ihn vermöbelt?",
        video: "https://www.youtube.com/embed/koGb7ZoBCCE?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Bonusfrage von Hochkönig! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/rHq6i_3_9f4?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/LgalFvnQfiU?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }
    static readonly gorn4:LocationQuestion = { // Gorn 400
        question: "Gorn hat sich verlaufen. Wo befindet er sich? (2)",
        searchPicture: "assets/geoguessr/searchPictures/GeoG 4 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/GeoG 4 Antwort.jpg",
        imgurLink: this.geoImgurPics.khorinis, //khorinis
        bonus: false,
    }
    static readonly gorn5: VoicelineQuestion = { // Gorn 500
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/Gorn 500 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/FoJRMyNRzRc?controls=1&vq=hd1080&autoplay=0",
        bonus: false
    }

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
