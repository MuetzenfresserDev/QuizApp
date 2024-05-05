import { ActivatedRoute } from "@angular/router";
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

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/SNuY9rbGUio?controls=0&autoplay=1&mute=1&loop=1&vq=hd1080'; //Hintergrund Video

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
        "assets/katPictures/erkenne das Pokemon.png",
        "assets/katPictures/Fusion.png",
        "assets/katPictures/Geoguessr.png",
        "assets/katPictures/Pokedex.png",
        "assets/katPictures/Trivia.png",
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

    /* Namenloser Held */
    static readonly held1:GeoguessrQuestion = { // Held 100
        question: "Erkenne die Pokemon am Umriss! (2 von 3)",
        searchPicture: "assets/geoguessr/searchPictures/Erkenne das Pokemon 100 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Erkenne das Pokemon 100 Antwort.png",
        imgurLink: "https://i.imgur.com/0Px7J2C.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    static readonly held2:GeoguessrQuestion = { // Held 200
        question: "Erkenne das Pokemon an der Pre-Release Konzeptzeichnung! ",
        searchPicture: "assets/geoguessr/searchPictures/Erkenne das Pokemon 200 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Erkenne das Pokemon 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PDxOKb7.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Cupidos','Tangela', 'Riffex', 'Tangolos'],
        index: 1 
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Bonusfrage von Frau Tina! => 500 Gold Frage",
        video: "https://www.youtube.com/embed/xpcLGtHBhzg?controls=1&vq=hd1080&autoplay=00",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/v23_SQ9LEeU?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held4:GuessingQuestion = { // Held 400
        question: "Erkenne das Pokemon anhand der Bilder/Emojis! (2 von 3)",
        video: "https://www.youtube.com/embed/no2peq8WwKs?controls=1&vq=hd1080&autoplay=00",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/383f-Irz9ro?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held5:GuessingQuestion = { // Held 500
        question: "Erkenne das Pokemon am Schrei! (2 von 3)",
        video: "https://www.youtube.com/embed/AC5Zr7QbzEg?controls=1&vq=hd1080&autoplay=00",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/B-VqwjjFcUg?controls=1&vq=hd1080&autoplay=0"
    }


    /* Diego */
    static readonly diego1: GeoguessrQuestion= { // Diego 100
        question: "Welche Pokemon wurden hier vereinigt?",
        searchPicture: "assets/geoguessr/searchPictures/Fusion 100 Frage.jpg",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Fusion 100 Antwort.png",
        imgurLink: "https://i.imgur.com/NdO0Hf0.jpeg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Nockchan-Swine','Maschok-Mamutel', 'Macholo-Quickel', 'Machollo-Keifel'],
        index: 3  
    }
    static readonly diego2: GeoguessrQuestion = { // Diego 200
        question: "Welche Pokemon wurden hier vereinigt?",
        searchPicture: "assets/geoguessr/searchPictures/Fusion 200 Frage.jpg",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Fusion 200 Antwort.png",
        imgurLink: "https://i.imgur.com/RLqadRz.jpeg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Glumanda-Menkey','Glumanda-Traumato', 'Glutexo-Glumanda'],
        index: 2  
    }
    static readonly diego3:GeoguessrQuestion= { // Diego 300
        question: "Welche Pokemon wurden hier vereinigt?",
        searchPicture: "assets/geoguessr/searchPictures/Fusion 300 Frage.jpg",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Fusion 300 Antwort.png",
        imgurLink: "https://i.imgur.com/ZCXZgb5.jpeg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Shuppet-Banette','Banette-Traumfugil', 'Banette-Ditto'],
        index: 0  
    }
    static readonly diego4: GeoguessrQuestion= { // Diego 400
        question: "Welche Pokemon wurden hier vereinigt?",
        searchPicture: "assets/geoguessr/searchPictures/Fusion 400 Frage.jpg",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Fusion 400 Antwort.png",
        imgurLink: "https://i.imgur.com/pXbFdOm.jpeg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Onix-Qurtel','Stahlos-Qurtel', 'Stahlos-Tornupto'],
        index: 2  
    }
    static readonly diego5: GeoguessrQuestion = { // Diego 500
        question: "Welche Pokemon wurden hier vereinigt?",
        searchPicture: "assets/geoguessr/searchPictures/Fusion 500 Frage.jpg",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Fusion 500 Antwort.png",
        imgurLink: "https://i.imgur.com/zBlpw8d.jpeg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Nidoqueen.Keyogre','Nidoking-Keyogre', 'Keyogre-Nidorino'],
        index: 1 
    }

    /* Lester */
    static readonly lester1:LocationQuestion= { // Lester 100
        question: "Wo ist der gesuchte Ort? (1)",
        searchPicture: "assets/geoguessr/searchPictures/GeoGuessr 100 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester2:LocationQuestion = { // Lester 200
        question: "Wo ist der gesuchte Ort? (2)",
        searchPicture: "assets/geoguessr/searchPictures/GeoGuessr 200 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Bonusfrage von Strey! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/XQyjwbeF6Ac?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/lBmtyeXRBBY?controls=1&vq=hd1080&autoplay=0",
        options: ['11','6', '7', '10'],
        index: 3 
    }
    static readonly lester4: LocationQuestion = { // Lester 400
        question: "Wo ist der gesuchte Ort? (3)",
        searchPicture: "assets/geoguessr/searchPictures/GeoGuessr 400 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester5: LocationQuestion = { // Lester 500
        question: "Wo ist der gesuchte Ort? (4)",
        searchPicture: "assets/geoguessr/searchPictures/GeoGuessr 500 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }


    /* Milten */
    static readonly milten1:GuessingQuestion = { // Milten 100
        question: "Ein äußerst sonderbares Pokémon, das plötzlich auf rätselhafte Weise in einem Pokéball auftaucht, \n wenn […] sich entwickelt.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Pokecheck 100 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Nincada','Damhirplex', 'Ditto', 'Ninjatom'],
        index: 3 
    }
    static readonly milten2:GuessingQuestion = { // Milten 200
        question: "Seine Erscheinung ändert sich je nach Wetter. \n Dies hat weniger mit seinem eigenen Willen zu tun als vielmehr mit einer chemischen Reaktion.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Pokecheck 200 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Formeo','Griffel', 'Glibunkel', 'Mew'],
        index: 0 
    }
    static readonly milten3: GuessingQuestion = { // Milten 300
        question: "So manches kleine Kind soll schon verschwunden sein, weil es ein […] \n festhielt, das es mit einem Ballon verwechselt hatte.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Pokecheck 300 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Nebulak','Driftlon', 'Zwirlicht', 'Kramurks'],
        index: 1 
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "Dieses auch als „Geist der Wüste“ bekannte Pokémon versteckt sich in Sandstürmen, \n die es durch das Schlagen seiner Flügel erzeugt.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Pokecheck 400 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Libeldra','Vibrava', 'Tauboga', 'Staraptor'],
        index: 0 
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Dieses Pokémon liebt ein ordentliches Kräftemessen. \n Es ist stark genug, um mit der flachen Hand einen rasenden Zug aufzuhalten.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Pokecheck 500 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Meistagriff','Hariyama', 'Nockchan', 'Rabautz'],
        index: 1 
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "Was ist nicht sehr effektiv? Nenne 3/6",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Trivia 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Trivia 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200 
        question: "Was ist der optische Unterschied, zwischen einem männlichen und einem weiblichen Pikachu?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Trivia 200 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Was ist sehr effektiv? Nenne 3/6",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Trivia 300 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Trivia 300 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn4:GuessingQuestion = { // Gorn 400
        question: "Um welches Pokemon handelt es sich hier?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Trivia 400 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Trivia 400 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Gengar','Karpador', 'Krippuk', 'Nebulak'],
        index: 3 
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Um welches Pokemon handelt es sich hier?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Trivia 500 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Trivia 500 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Raikou','Watty', 'Voltenso', 'Yarak'],
        index: 2 
    }

    //TODO: GEO + KONTROLLE

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
