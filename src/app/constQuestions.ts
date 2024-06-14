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

    /* Namenloser Held / Schule*/
    static readonly held1:GuessingQuestion = { // Held 100
        question: "Geschichte: Marie Antoinette war die Frau des französischen Königs Ludwig dem 16. Ihre berühmteste Aussage habe sie \n jedoch eigentlich niemals gesagt. Wie lautet dieses Zitat?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held2:GuessingQuestion = { // Held 200
        question: "Chemie/Physik: Welche ist die kleinstmögliche Temperatur im Universum?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/200 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['0°','-375,58°', '-273,15°', '-69°'],
        index: 2
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Deutsch: Zu welcher Wortart gehört das Wort „nur“?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/300 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/300 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Adjektiv','Verb', 'Adverb', 'Nomen'],
        index: 2
    }
    static readonly held4:GuessingQuestion = { // Held 400
        question: "Mathe: Löse folgende Aufgabe:",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/400 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/400 Frage.png',
        bonus: false,
        videoQuestion: "" ,
        options: ['0,555...','0,42', '0,3', '0,333...'],
        index: 3
    }
    static readonly held5:GuessingQuestion = { // Held 500
        question: "Philosophie: Das Höhlengleichnis ist eines der bekanntesten Gleichnisse der antiken Philosophie. Es stammt von dem \n griechischen Philosophen Platon. Male eine ungefähre Darstellung dieses Gleichnisses.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/500 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/500 Frage.png',
        bonus: false,
        videoQuestion: "" 
    }


    /* Diego*/
    static readonly diego1: GuessingQuestion= { // Diego 100
        question: "In der Cartoon-Serie „Kim Possible“ besitzt der Charakter Ron Stoppable ein Haustier mit dem Namen Rufus. \n Um was für ein Tier handelt es sich hierbei?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/100 Filme Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/100 Filme Frage.png',
        bonus: false,
        videoQuestion: "" ,
        options: ['Nacktmull','Hund', 'Katze', 'Vogel'],
        index: 0
    }
    static readonly diego2: GuessingQuestion = { // Diego 200
        question: "„DuckTales – Neues aus Entenhausen“ sollte jedem ein Begriff sein. Zumindest hat mit Sicherheit jeder schonmal \n etwas von dieser Serie gehört. Die deutschsprachige Erstausstrahlung war am 8. April. \n Jedoch in welchem Jahr? Schätze!",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/200 Filme Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/200 Filme Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['1969','1989', '1993', '2000'],
        index: 1
    }
    static readonly diego3:GuessingQuestion= { // Diego 300
        question: "Anime: Son Goku, der Hauptcharakter in Dragonball hat so einige male die Welt gerettet. \n Doch wie oft ist er in der Serie Dragonball Z gestorben?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/300 Filme Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/300 Filme Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['0','1', '2', '4'],
        index: 2
    }
    static readonly diego4: GeoguessrQuestion= { // Diego 400 BONUS FEHLT NOCH TODO
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
    static readonly diego5: GuessingQuestion = { // Diego 500
        question: "Der folgende Sound spielte sich im ersten Captain America Film, The first Avenger, ab, während Steve Rogers über eine \n eingestürzte Brücke sprang, während alles um ihn herum in Flammen stand. In welchem Film \n (besser noch in welcher anderen Szene) kam dieser Sound nochmal zum Einsatz?",
        video: "https://www.youtube.com/embed/IJtW12PnQ3A?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/5MJsPz5u61k?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }

    /* Lester / Goe zum Schluss*/
    static readonly lester1:LocationQuestion= { // Lester 100
        question: "Wo ist der gesuchte Ort? (1)",
        searchPicture: "assets/geoguessr/searchPictures/100 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/100 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester2:LocationQuestion = { // Lester 200
        question: "Wo ist der gesuchte Ort? (2)",
        searchPicture: "assets/geoguessr/searchPictures/200 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester3:LocationQuestion = { // Lester 300
        question: "Wo ist der gesuchte Ort? (3)",
        searchPicture: "assets/geoguessr/searchPictures/300 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/300 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester4: LocationQuestion = { // Lester 400
        question: "Wo ist der gesuchte Ort? (4)",
        searchPicture: "assets/geoguessr/searchPictures/400 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/400 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly lester5: LocationQuestion = { // Lester 500
        question: "Wo ist der gesuchte Ort? (5)",
        searchPicture: "assets/geoguessr/searchPictures/500 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/500 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }


    /* Milten / Games*/
    static readonly milten1:GeoguessrQuestion = { // Milten 100
        question: "Minecraft: Wie baut man eine Steinschaufel? Zeichne!",
        searchPicture: "assets/geoguessr/searchPictures/100 Games Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/100 Games Antwort.png",
        imgurLink: "https://i.imgur.com/yMfODzo.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    static readonly milten2:GeoguessrQuestion = { // Milten 200
        question: "Schach: Welcher Spielzug muss vollzogen werden für einen Sieg? Zeiche!",
        searchPicture: "assets/geoguessr/searchPictures/200 Games Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/200 Games Antwort.png",
        imgurLink: "https://i.imgur.com/xYmxm2R.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    static readonly milten3: BuzzerQuestion = { // Milten 300
        question: "Steam-Rezension: Um welches Spiel handelt es sich hierbei?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/300 Games Antwort.png",
        pictureQuestion: "assets/buzzer/300 Games Frage.png"
    }
    static readonly milten4:GuessingQuestion = { // Milten 400 FEHLT NOCH TODO
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
        question: "Welches Spiel ist hier zu sehen?",
        video: "https://www.youtube.com/embed/mslx7m4tN78?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/FexjwpyoUsk?controls=1&vq=hd1080&autoplay=0",
        options: ['Witcher 3','Arcania', 'Gothic Remake', 'GTA V'],
        index: 0 
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "Schätzfrage: Wieviel kosten die folgenden Produkte zusammen: ",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/100 Alltag Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/100 Alltag Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200
        question: "Bonusfrage von RPGKurga! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/d1OOWQWTzmk?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/Rx3YFxLUVdY?controls=1&vq=hd1080&autoplay=0",
        options: ['1954','1974', '1990', '2005'],
        index: 3
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Oh nein! Ich wurde verletzt! Glücklicherweise wissen wir alle, dass meine Blutgruppe A negativ ist. \n Welche Blutgruppen können mir Blut spenden?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/300 Alltag Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/300 Alltag Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn4:GuessingQuestion = { // Gorn 400
        question: "Wer hat Vorfahrt?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/400 Alltag Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/400 Alltag Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Im Alltag können viele Herausforderungen auf uns Treffen. Hier ein paar Fragen, um auf der nächsten Party mitreden zu können:",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/500 Alltag Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/500 Alltag Frage.png',
        bonus: false,
        videoQuestion: ""
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
