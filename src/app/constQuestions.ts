import { ActivatedRoute } from "@angular/router";
import { BuzzerQuestion, ErrorQuestion, GeoguessrQuestion, GuessingQuestion, LocationQuestion, MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    constructor(private route: ActivatedRoute){

        this.route.queryParams.subscribe(params => {
            ConstQuestions.twitchAuth.channelId = params['channelId'];
            ConstQuestions.twitchAuth.clientId = params['clientId'];
            ConstQuestions.twitchAuth.oauthToken = params['oauthToken']
        })

    }

    static readonly clientId: string = '38c4dfef2a0e8aba637ea15987ba542f';

    static readonly whiteboardUrls: string[] = [
        '7f3bd35f-d647-4f10-9acd-56d34f446d82',  //Spieler 1 Url
        '8a647b8b-27da-4001-8b1a-b06fb978ff76',  //Spieler 2 Url
        '58bda352-1363-4b4a-8e17-2f9f8755a925',  //Spieler 3 Url
        'e561cc9f-cb97-4031-b8f8-a1b0ad875676'   //Spieler 4 Url
    ];

    static twitchAuth = {
        twitchApiUrl: 'https://api.twitch.tv/helix',
        clientId: '',
        oauthToken: '',
        channelId: ''
    }

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/2kL4-TdQ3dw?controls=0&autoplay=1&mute=1&playlist=2kL4-TdQ3dw&loop=1'; //Hintergrund Video

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
        question: "Um welche Waffe handelt es sich hier?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Das ist ein altes Schwert!",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 100 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        options: ['Schwert','rostiges Schwert', 'altes Schwert', 'rostiger Einhänder'],
        index: 2 
    }
    static readonly held2:GuessingQuestion = { // Held 200
        question: "Welchem Lager innerhalb der Kolonie gehörte der erste Bandit an, der einen in G2 anspricht?",
        video: "https://www.youtube.com/embed/0xrNGulX4PM?si?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Altes Lager','Neues Lager', 'Sumpf Lager', 'Quentins Banditen'],
        index: 0 
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Um welche Waffe handelt es sich hier?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Das ist eine Folteraxt!",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 300 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        /* options: ['Spalter','Reiser', 'Folteraxt', 'rostige Axt'],
        index: 2  */
    }
    static readonly held4:LocationQuestion = { // Held 400 -> GEOGUESSR !1!
        question: "Der Held hat sich mal wieder verlaufen. Wo befindet er sich? (1)",
        searchPicture: "assets/geoguessr/searchPictures/Held 400 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Held 400 Antwort.jpg",
        imgurLink: this.geoImgurPics.g1Minental, 
        bonus: false,
    }
    static readonly held5:BuzzerQuestion = { // Held 500
        question: "Wer hat den Brief für den obersten Feuermagier geschrieben (bzw, dem Helden ausgehändigt)?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/tlhZMkSrlMk?controls=1&vq=hd1080&autoplay=0",
        /* options: ['Serpentes','Xardas', 'Marduk', 'Pyrokar'],
        index: 3  */
    }


    /* Diego */
    static readonly diego1: GuessingQuestion = { // Diego 100
        question: "Bonusfrage von Jorgenson! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/EdvnjF_Wk18?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/izwNF3rnhFA?controls=1&vq=hd1080&autoplay=0",
        /* options: ['Keiner','1', '2', '3'],
        index: 1  */
    }
    static readonly diego2:GuessingQuestion = { // Diego 200
        question: "Um in Gothic 1 Taschendiebstahl durchzuführen braucht man essentiell eine weitere Fähigkeit. \n Welche?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Man benötigt das wissen über das Schleichen!",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        /* options: ['Geschick > 30','Einhandkampf Stufe 1', 'Schlösser öffnen', 'Schleichen'],
        index: 3  */
    }
    static readonly diego3:LocationQuestion = { // Diego 300 -> GEOGUESSR !2!
        question: "Diego hat sich mal wieder verlaufen. Wo befindet er sich? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Diego 300 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 300 Antwort.jpg",
        imgurLink: this.geoImgurPics.g1Minental, 
        bonus: false,
    }
    static readonly diego4: GeoguessrQuestion= { // Diego 400
        question: "Welche dieser Flaggen ist die Piratenflagge der Greg Piraten?",
        searchPicture: "assets/geoguessr/searchPictures/Diego 400 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 400 Antwort.png",
        imgurLink: "https://i.imgur.com/UbTRoV0.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        /* options: ['Oben links','Oben rechts', 'Unten links', 'Unten rechts'],
        index: 0  */
    }
    static readonly diego5: BuzzerQuestion = { // Diego 500
        question: "Greg, der Kapitän der Piraten schimpft in seinem Logbuch ganz stark über das Verhalten der Banditen. \n Einer der Banditen wird namentlich erwähnt. Den möchte er zu Fischfutter verarbeiten. \n Um wen geht es?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Diego 500 Antwort.jpg",
        /* options: ['Raven','Esteban', 'Bloodwyn', 'Juan'],
        index: 2  */
    }

    /* Lester */
    static readonly lester1:VoicelineQuestion = { // Lester 100
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/Lester 100 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/NHujIooPL1s?controls=1&vq=hd1080&autoplay=0",
        bonus: false,
        /* options: ['Bloodwyn','Lee', 'Saturas', 'Raven'],
        index: 1  */
    }
    static readonly lester2: GuessingQuestion = { // Lester 200
        question: "Welche Wirkungen haben die drei Sumpfkrautstängel der Bruderschaft?",
        video: "https://www.youtube.com/embed/G5C6OsUa8pU?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        /* options: ['+10 Erfahrung, +5 Erfahrung, +2 Mana','+50 Erfahrung, +1 Mana, +2 Mana', '+25 Erfahrung, +50 Erfahrung, +1 Mana', '+50 Erfahrung, +2 Mana, +3 Mana'],
        index: 0  */
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/BJ0-RVjcM1o?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/lYTZUAxvYD8?controls=1&vq=hd1080&autoplay=0",
        /* options: ['wahr wahr wahr','falsch wahr falsch', 'wahr wahr falsch', 'falsch falsch war'],
        index: 2  */
    }
    static readonly lester4:BuzzerQuestion = { // Lester 400
        question: "Wer bin ich?",
        kind: "Buzzer-Frage",
        audio: "assets/buzzer/Lester 400 Frage.mp3",
        /* options: ['Gomez','Diego', 'Gorn', 'Sylas'],
        index: 1  */
    }
    static readonly lester5: LocationQuestion = { // Lester 500 -> Geoguessr !3!
        question: "Lester hat sich mal wieder verlaufen. Wo befindet er sich? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Lester 500 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Lester 500 Antwort.jpg",
        imgurLink: this.geoImgurPics.khorinis, 
        bonus: false,
    }

    /* Milten */
    static readonly milten1:GeoguessrQuestion= { // Milten 100
        question: "Milten schreibt Spruchrollen. Er hat jedoch vergessen, welche Farbe die Punktfarbe folgender Spruchrollen werden muss. \n Die erste hat er schon gefärbt!",
        searchPicture: "assets/geoguessr/searchPictures/Milten 100 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 100 Antwort.png",
        imgurLink: "https://i.imgur.com/QY7Y0UY.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        /* options: ['Rot Grün Blau','Schwarz Lila Rot', 'Rot Lila Gelb', 'Blau Grün Gelb'],
        index: 2  */
    }
    static readonly milten2:GuessingQuestion = { // Milten 200 TODO -> Fehlt noch
        question: "Milten kontrolliert die Innos-Schreine auf Spenden. Hilf ihm, sich die Items am Schrein von Lobarts Hof zu merken! \n Nenne 2 verschiedene!",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "1 Wasser, 1 Apfel, 1 Gold, 2 Fischsuppen und 2 Blauflieder (eine Kerze)",
        picture: "assets/guessing/pictures/Milten 200 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly milten3: LocationQuestion = { // Milten 300 -> Geoguessr !4!
        question: "Milten hat Urshak im alten Kastell gefunden! \n Weist du auch wo er in Gothic 2 zu finden ist? (4)",
        searchPicture: "assets/geoguessr/searchPictures/Milten 300 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 300 Antwort.jpg",
        imgurLink: this.geoImgurPics.g2Minental, 
        bonus: false,
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "Nach dem Abenteuer der Fokussuche begibt sich Milten laut eigener Aussage zurück zum Alten Lager. Das ist nicht ganz wahr. \n Die Frage ist aber nicht, wohin er sich hinbegibt, sondern wie lange er für diesen Weg braucht. \n Schätzt die Zeit!",
        video: "https://www.youtube.com/embed/W2U9fEPbO5s?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        /* options: ['4:20', '3:22', '5:21', '3:48'],
        index: 3  */
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Torrez bietet einige Bücher zum verkauf an. Dies ist das erste Band einer Buchreihe.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Das Buch heist Lehren der Götter Band 1",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Milten 500 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        /* options: ['Lehren der Götter Band 1','Astronomie Band 2', 'Chromanin (3)', 'Arkanum Golum Band 2'],
        index: 0  */
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "Wie lange dauert es, bis Fester das Nest der Feldräuber gesäubert hat?",
        video: "https://www.youtube.com/embed/E9Z6NyigDuA?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        /* options: ['0:39', '1:05', '0:57', '1:16'],
        index: 0  */
    }
    static readonly gorn2:BuzzerQuestion = { // Gorn 200 
        question: "Jarvice, Söldner aus dem Neuen Lager, ist der Meinung, etwas „besonderes“ zum Tausch für ihren Erzhaufen bekommen zu können. \n Was ist das?",
        kind: "Buzzer-Frage",
        video:"https://www.youtube.com/embed/wYKcJaXAuAU?controls=1&vq=hd1080&autoplay=0",
        /* options: ['Begnadigung', 'Waffen', 'Des Königs Frau', 'Köstliches essen'],
        index: 2  */
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300 -> TODO Fehlt noch
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
        audio: "assets/voicelines/Gorn 400 Frage.mp3",
        /* options: ['Cord', 'Jakal', 'Bloodwyn', 'Lefty'],
        index: 3  */
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Gorn geht auf den Markt. Er besitzt 10 Gold. \n Er verkauft seine Steitaxt und seine Kriegsarmbrust. \n Wie viele kleine Heiltränke (Essens der Heilung) kann er sich nun leisten?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "Kriegsarmbrust 225 Gold, Steitaxt 165 Gold, 10 Gold = 400 Gold. \n Essens der Heilung kostet 25 Gold pro Stück, er kauft 16 Stück",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "", //Fragevideo
        /* options: ['5', '7', '16', '19'],
        index: 2  */
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
