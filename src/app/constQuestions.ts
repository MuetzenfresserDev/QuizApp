import { ErrorQuestion, GeoguessrQuestion, GuessingQuestion, MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    static readonly whiteboardUrls: string[] = [
        '99090540-6ea4-4014-ae2a-db97e028dba8',  //Spieler 1 Url
        'd825987e-cff0-45ef-9d1a-b34dbcf3d6c5',  //Spieler 2 Url
        '1b942aac-2e88-424d-96ed-3576e90dbfc9',  //Spieler 3 Url
        'c36ed847-361f-4d53-88c7-69aef20ca5d8'   //Spieler 4 Url
      ];

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/DWzJzg7N0NA?controls=0&vq=hd1080&autoplay=1&mute=1'; //Hintergrund Video

    static readonly videoSize = {width: '850', height: '478'};

    static readonly timers = {
        multivoice: 30,
        errorgeo: 100,
        guess: 30
    };

    static readonly multiplechoice1:  MultiplechoiceQuestion = {
        question: "test Frage",
        options: {
            option1: "A: 1111",
            option2: "B: 2222",
            option3: "C: 3333",
            option4: "D: 4444",
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: 'D: 4444'
    }
    static readonly multiplechoice2:  MultiplechoiceQuestion = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: ''
    }
    static readonly multiplechoice3:  MultiplechoiceQuestion = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: ''
    }
    static readonly multiplechoice4:  MultiplechoiceQuestion = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: ''
    }
    static readonly multiplechoice5:  MultiplechoiceQuestion = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: ''
    }

    
    static readonly voiceline1: VoicelineQuestion = {
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/unbenannt.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "nameless"
    }
    static readonly voiceline2: VoicelineQuestion = {
        question: "",
        voiceLine: "",
        kind: "Voiceline-Fragen",
        correctAnswer: ""
    }
    static readonly voiceline3: VoicelineQuestion = {
        question: "",
        voiceLine: "",
        kind: "Voiceline-Fragen",
        correctAnswer: ""
    }
    static readonly voiceline4: VoicelineQuestion = {
        question: "",
        voiceLine: "",
        kind: "Voiceline-Fragen",
        correctAnswer: ""
    }
    static readonly voiceline5: VoicelineQuestion = {
        question: "",
        voiceLine: "",
        kind: "Voiceline-Fragen",
        correctAnswer: ""
    }

    static readonly errors1: ErrorQuestion = {
        question: "Was stimmt auf diesem Bild nicht?",
        errorPicture: "assets/errors/errorPictures/error1.jpg",
        kind: "Fehlersuche-Frage",
        correctedPicture: "assets/errors/correctedPictures/corrected1.jpg",
        imgurLink: "https://i.imgur.com/dQUpoJN.jpeg"   //gleiche wie errorPicture um darauf dann Fehler zu Markieren.
    }
    static readonly errors2: ErrorQuestion = {
        question: "",
        errorPicture: "",
        kind: "",
        correctedPicture: "",
        imgurLink: ""
    }
    static readonly errors3: ErrorQuestion = {
        question: "",
        errorPicture: "",
        kind: "",
        correctedPicture: "",
        imgurLink: ""
    }
    static readonly errors4: ErrorQuestion = {
        question: "",
        errorPicture: "",
        kind: "",
        correctedPicture: "",
        imgurLink: ""
    }
    static readonly errors5: ErrorQuestion = {
        question: "",
        errorPicture: "",
        kind: "",
        correctedPicture: "",
        imgurLink: ""
    }

    static readonly geo1: GeoguessrQuestion = {
        question: "Wo befinden wir uns?",
        searchPicture: "assets/geoguessr/searchPictures/error1.jpg", //Karte mit markiertem Punkt
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/corrected1.jpg", //Karte mit markiertem Punkt
        imgurLink: "https://i.imgur.com/j4kaS5k.jpeg" //Karte ohne Markierung
    }
    static readonly geo2: GeoguessrQuestion = {
        question: "",
        searchPicture: "",
        kind: "",
        markedPicture: "",
        imgurLink: ""
    }
    static readonly geo3: GeoguessrQuestion = {
        question: "",
        searchPicture: "",
        kind: "",
        markedPicture: "",
        imgurLink: ""
    }
    static readonly geo4: GeoguessrQuestion = {
        question: "",
        searchPicture: "",
        kind: "",
        markedPicture: "",
        imgurLink: ""
    }
    static readonly geo5: GeoguessrQuestion = {
        question: "",
        searchPicture: "",
        kind: "",
        markedPicture: "",
        imgurLink: ""
    }

    static readonly guess1:GuessingQuestion = {
        question: "Wie lange braucht der Held von x nach y?",
        video: "https://www.youtube.com/embed/TVz1WKXTqO8?controls=1&vq=hd1080&autoplay=1&mute=1",
        kind: "Schätz-Frage",
        correctAnswer: "Der Held braucht x Minuten und x Sekunden",
        picture: '',
    }
    static readonly guess2:GuessingQuestion = {
        question: "Wie viele Orks stehen vor der Bibliothek in Jahrkendar?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "ka 12 oder so?",
        picture: "assets/guessing/pictures/orks.jpg"
    }
    static readonly guess3:GuessingQuestion = {
        question: "Wie viel Gold liegt in der Diebeshöhle versteckt? (inkl. verkaufter Waren)",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "1111 Gold",
        picture: ""
    }
    static readonly guess4:GuessingQuestion = {
        question: "",
        video: "",
        kind: "",
        correctAnswer: "",
        picture: ""
    }
    static readonly guess5:GuessingQuestion = {
        question: "",
        video: "",
        kind: "",
        correctAnswer: "",
        picture: ""
    }

    static readonly questions1: any[]  = [this.multiplechoice1,this.multiplechoice2,this.multiplechoice3,this.multiplechoice4,this.multiplechoice5]
    static readonly questions2: any[] = [this.voiceline1, this.voiceline2, this.voiceline3, this.voiceline4, this.voiceline5]
    static readonly questions3: any[] = [this.errors1, this.errors2, this.errors3, this.errors4, this.errors5]
    static readonly questions4: any[] = [this.geo1, this.geo2, this.geo3, this.geo4, this.geo5]
    static readonly questions5: any[] = [this.guess1, this.guess2, this.guess3, this.guess4,this.guess5]

    static readonly questions = {
        questions1: this.questions1,
        questions2: this.questions2,
        questions3: this.questions3,
        questions4: this.questions4,
        questions5: this.questions5
    }
}
