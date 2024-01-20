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

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/opDt2chYp04?controls=0&autoplay=1&mute=1&loop=1&vq=hd1080'; //Hintergrund Video

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
        question: "Der Held erhöht seine Lebensenergie in der Regel durch einen Levelaufstieg. \n Wie hoch ist dieser in G2 die Nacht des Raben?",
        video: "https://www.youtube.com/embed/MkCiCvtF5No?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['8','15', '10', '12'],
        index: 3 
    }
    static readonly held2:GuessingQuestion = { // Held 200
        question: "Bonusfrage von HerrBrom! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/cghikTEn1sI?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/Souigzzxj1U?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        options: ['A','B', 'C', 'D'],
        index: 0 
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Wahr oder Falsch? Entscheide!",
        video: "https://www.youtube.com/embed/vKH1VBTYWJc?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/ioa-EwSU6iM?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        options: ['w,f,w','f,f,f', 'w,f,f', 'w,w,w'],
        index: 2 
    }
    static readonly held4:GuessingQuestion = { // Held 400
        question: "Wie lange braucht die Fleischwanze von dieser Position aus bis sie in Diegos Hütte ankommt? \n Schätze die Zeit!",
        video: "https://www.youtube.com/embed/6aVgu1mu8KY?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 400 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        options: ['1:42','0:59', '1:23', '1:33'],
        index: 3 
    }
    static readonly held5:GuessingQuestion = { // Held 500
        question: "Der Held hat 100.000 Hp und entscheidet sich das Fliegen zu testen. Also springt er hier runter. \n Wie viel Lebensenergie wird ihm nach dem Aufprall wohl bleiben? Schätze!",
        video: "https://www.youtube.com/embed/dPZGdy3NSsI?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 500 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        options: ['12567','98781', '82298', '74553'],
        index: 2 
    }


    /* Diego */
    static readonly diego1: GuessingQuestion = { // Diego 100
        question: "Wie heißt die Quest? \n „Doch die Begegnung verlief völlig anders als erwartet. […] \n Ich bin mir nicht sicher, wie ich […] vom Verlauf dieses Gesprächs berichten soll.“ \n „Sobald ich einen anderen Weg gefunden habe […] werde ich ihm die ganze Wahrheit erzählen.“",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Diego 100 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego2: GeoguessrQuestion = { // Diego 200
        question: "Welche dieser Flaggen gehört zur Stadt Khorinis und ist unter anderem über dem Rathaus zu bewundern?",
        searchPicture: "assets/geoguessr/searchPictures/Diego 200 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 200 Antwort.png",
        imgurLink: "https://i.imgur.com/Y2lntyE.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Löwe','Adler','Helm','Greif','Drache','Fetzen'],
        index: 3
    }
    static readonly diego3:GuessingQuestion= { // Diego 300 -> GEOGUESSR !2!
        question: "Fülle die Lücken des Troll-Charakterbogens. Jede richtige Lücke gibt einen Punk. \n Der mit den meisten richtigen bekommt die Punkte!",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Diego 300 Antwort.jpg",
        pictureQuestion: 'assets/guessing/pictures/Diego 300 Frage.jpg',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego4: GuessingQuestion= { // Diego 400
        question: "Im Buch Rezepturen Band 2 (G1) steht etwas über den Wein des Vergessens geschrieben. \n Laut diesem Buch sind die besten Trauben für diesen Wein an einem gewissen Ort. \n Wie lautet der Name dessen? (Dieser Ort ist im Originalspiel G1 nicht zu erreichen)",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Diego 400 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego5: LocationQuestion = { // Diego 500 !GEOGUESSER1!
        question: "Diego hat sich verlaufen... Wo befindet er sich? (1)",
        searchPicture: "assets/geoguessr/searchPictures/Diego 500 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 500 Frage.jpg",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }

    /* Lester */
    static readonly lester1:GuessingQuestion= { // Lester 100
        question: "Bonusfrage von Hel's Play! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/ABrw9tRK0R8?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/MLHAzFkYXzo?si?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        options: ['Gestath','Drax','Aidan','Templer'],
        index: 3 
    }
    static readonly lester2: GuessingQuestion = { // Lester 200
        question: "Wie heißt das Item in diesem Bild?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Lester 200 Antwort.jpg",
        pictureQuestion: 'assets/guessing/pictures/Lester 200 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        options: ['Wolfsfell','Keilerfell','Schafsfell','Flohteppich'],
        index: 2 
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Wahr oder Falsch? Entscheide!",
        video: "https://www.youtube.com/embed/fH7H2Mz9uSU?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/bbgYHcv3Mro?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        options: ['falsch,falsch,falsch','falsch,wahr,wahr', 'wahr wahr wahr', 'falsch wahr falsch'],
        index: 1 
    }
    static readonly lester4: GuessingQuestion = { // Lester 400
        question: "Lester geht mit 445 Gold in den Taschen zu Orlans Taverne. \n Er kauft sich dort 2 Schinken, 2 Leibe Brot, 3 Fackeln und ein Bier. Außerdem Mietet er ein Zimmer für eine Woche. \n Wie viel Gold bleibt ihm übrig? Oder reicht es gar nicht für all das?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "445 Gold am Anfang, kauft 2 Schinken (50 Goldstücke), 2 Brot(20 Goldstücke), 3 Fackeln (2 Goldstücke) \n und ein Bier (20 Goldstücke) + Zimmer bei Orlan (50 Goldstücke) \n Wie viel übrig? 229 Goldstücke",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['zu teuer','42', '229', '169'],
        index: 2 
    }
    static readonly lester5: VoicelineQuestion = { // Lester 500 -> Geoguessr !3!
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/Lester 500 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/i1fM50Qu0QY?controls=1&vq=hd1080&autoplay=0&vq=1080",
        bonus: false
    }


    /* Milten */
    static readonly milten1:GeoguessrQuestion= { // Milten 100
        question: "Male den Spruchrollen ihre Punkte in der richtigen Farbe!",
        searchPicture: "assets/geoguessr/searchPictures/Milten 100 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 100 Antwort.jpg",
        imgurLink: "https://i.imgur.com/o7hSnxu.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Bl,Gr,Bl,Ge Li','Li,Gr,Gr,Bl Li', 'Ge,Bl,Ge,Li Bl', 'Bl,Ge,Gr,Li Gr'],
        index: 0
    }
    static readonly milten2:GuessingQuestion = { // Milten 200
        question: "„Die Prüfung des Feuers. […] \n In dieser Prüfung soll gleichermaßen die [LÜCKE], Stärke und das Geschick des Novizen gefordert werden.“ \n Fülle die Lücke auf!",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Milten 200 Antwort.jpg",
        pictureQuestion: 'assets/guessing/pictures/Milten 200 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        options: ['magische Kraft','Weisheit', 'Güte', 'Klugheit'],
        index: 3
    }
    static readonly milten3: GuessingQuestion = { // Milten 300
        question: "Welcher dieser Runen gehört nicht zum 5. Kreis der Magie? \n Dämon beschwören, Eiswelle, Schwere Wunden heilen, Böses vernichten, Großer Feuersturm ",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Böses vernichten",
        picture: "assets/guessing/pictures/Milten 300 Antwort.jpg",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Dämon beschwören', 'Böses vertreiben', 'Wunden heilen', 'Eiswelle'],
        index: 1 
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "Babos Freunde haben dem Guten eine spannende Zeichnung zum Abschied geschenkt. \n Wie heißen diese beiden Freunde?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Feht und Bonka",
        picture: "assets/guessing/pictures/Milten 400 Antwort.jpg",
        pictureQuestion: 'assets/guessing/pictures/Milten 400 Frage.jpg',
        bonus: false,
        videoQuestion: "",
        options: ['Bill,John', 'Johan,Fred', 'Feht,Bonka', 'Gilles,Frank'],
        index: 2 
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Was ist die heilige Aura Innos und wer/wo besitzt/liegt diese?",
        video: "https://www.youtube.com/embed/0UGJ1HgKZ2I?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "Amulet, Pyrokar",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['Ring,Ulthar','Ring,Neoras', 'Amulet,Pyrokar', 'Amulet,Parlan'],
        index: 2
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "Bonusfrage von MaxDeus! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/c1J8a-cVZ8g?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        kind: "Schätz-Frage",
        correctAnswer: "-",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/-luj4lA2eOE?controls=1&vq=hd1080&autoplay=0&vq=hd1080",
        options: ['Pach,Urrok,Varrok', 'Dardok,Bach,Rok', 'Rok,Urrok,Varrok', 'Pok,Dok,Rok'],
        index: 0 
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200 
        question: "Lares und der Held gehen gemeinsam das Ornament zurückbringen. Den Weg zurück zur Stadt geht Lares allerdings allein. \n Wie lange braucht er für diesen Weg, bis er einen Fuß in die Stadt setzt?",
        video: "https://www.youtube.com/embed/HwuVNv54V8U?controls=1&vq=hd1080&autoplay=0&vq=hd1080", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "",
        options: ['13:37', '18:57', '12:57', '23:54'],
        index: 1
    }
    static readonly gorn3:LocationQuestion = { // Gorn 300 !GEOGUESSER2!
        question: "Gorn sucht das zweite Chromanin Buch... Wo befindet es sich? (2)",
        searchPicture: "",
        kind: "Location-Frage",
        markedPicture: "",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly gorn4:LocationQuestion = { // Gorn 400 !GEOGUESSR3!
        question: "Gorn hat sich verlaufen... Wo befindet er sich? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 400 Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/searchPictures/Gorn 400 Antwort.jpg",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Jan, ein Drachenjäger, kann dem Helden eine starke Rüstung herstellen. \n Welches Material/Materialien (und wieviel davon) braucht er für diese? \n Und für wieviel Gold verkauft er die Rüstung anschließend?",
        video: "https://www.youtube.com/embed/2XYqiP-zhoo?controls=1&vq=hd1080&autoplay=0&vq=hd1080", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "", //Fragevideo
        options: ['10 Schuppen,7000', '15 Schuppen,10000', '20 Schuppen,12000', '5 Schuppen,4000'],
        index: 2 
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
