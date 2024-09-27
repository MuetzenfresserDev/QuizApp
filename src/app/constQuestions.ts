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
        question: "Wer hat das gesagt?",
        audio: "assets/voicelines/Kat 1 100 Frage.mp3",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/cNEsgmwBX3k?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held2:BuzzerQuestion = { // Held 200
        question: "Wer gibt dem Helden die Quest mit folgenden Einträgen?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 200 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 200 Frage.png'
    }
    static readonly held3:BuzzerQuestion = { // Held 300
        question: "Eine weniger bekannte Textzeile oder Aussage in Gothic ist folgende: \n „Piranhas are watching you“. \n Wann wird man damit als Spieler konfrontiert?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 300 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 200 Frage.png'
    }
    static readonly held4:BuzzerQuestion = { // Held 400
        question: "Wer bin ich?",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 400 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 400 Frage.png'
    }
    static readonly held5:BuzzerQuestion = { // Held 500
        question: "Wie heißt diese Waffe? ",
        kind: "Buzzer-Frage",
        picture: "assets/buzzer/Kat 1 500 Antwort.png",
        pictureQuestion: 'assets/buzzer/Kat 1 500 Frage.png'
    }


    /* Diego*/ //ALLES GEOGUESSR... Zum Schluss!!!
    static readonly diego1: LocationQuestion= { // Diego 100
        question: "Wo ist der gesuchte Ort? (1)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 2 100 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 2 100 Antwort.webp",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly diego2: LocationQuestion = { // Diego 200
        question: "Wo ist der gesuchte Ort? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 2 200 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 2 200 Antwort.webp",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly diego3:LocationQuestion= { // Diego 300
        question: "Wo ist der gesuchte Ort? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 2 300 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 2 300 Antwort.webp",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly diego4: LocationQuestion= { // Diego 400 
        question: "Wo ist der gesuchte Ort? (4)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 2 400 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 2 400 Antwort.webp",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly diego5: LocationQuestion = { // Diego 500
        question: "Wo ist der gesuchte Ort? (5)",
        searchPicture: "assets/geoguessr/searchPictures/Kat 2 500 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Kat 2 500 Antwort.webp",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }

    /* Lester */
    static readonly lester1:GuessingQuestion= { // Lester 100
        question: "In Gothic 2 Classic sind bekanntlich alle Waffen etwas schwächer als \n in der Erweiterung Nacht des Raben. Füge folgende Waffe (Schadenstechnisch) in die richtige Position.",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester2:GuessingQuestion = { // Lester 200
        question: "In G2 Die Nacht des Raben hat Xardas auf seinem Tisch eine Steintafel liegen, die in der Geschichte  \n des Addons eine Rolle spielt. Was liegt auf diesem Tisch in der Classic Version?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 200 Frage.png',
        bonus: false,
        videoQuestion: "", //Fragevideo
        options: ['Kleiner Heiltrank','Apfel', 'Knochen', 'Nichts'],
        index: 3
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Auch wenn wir im Addon von Gothic 2 die Vermissten finden sollen, so existiert einer der Vermissten auch in Classic. \n Doch wer ist es?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 3 300 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 300 Frage.png',
        bonus: false,
        videoQuestion: "", //Fragevideo
        options: ['Joe','Patrick', 'Monty', 'Lucia'],
        index: 0
    }
    static readonly lester4: GuessingQuestion = { // Lester 400
        question: "Wer ist laut seiner Beschreibung Dexters Auftraggeber in Gothic 2 Classic?",
        video: "https://www.youtube.com/embed/rtJtkeRxBNQ?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 3 400 Frage.png',
        bonus: false,
        videoQuestion: "", //Fragevideo
        options: ['Gomez','Raven', 'Gilbert', 'Suchender'],
        index: 3
    }
    static readonly lester5: GuessingQuestion = { // Lester 500 TODO BONUS
        question: "Bonusfrage von Graf von Gestern! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/5hxCxT9B3jI?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/djn-N3_KuwA?controls=1&vq=hd1080&autoplay=0",
        options: ['Aidan','Franco', 'Templer', 'Bandit'],
        index: 2
    }


    /* Milten / Games*/
    static readonly milten1:GuessingQuestion = { // Milten 100
        question: "Nenne den ersten Satz von Lord Andre (keine Strafe)",
        video: "https://www.youtube.com/embed/ZyAmWZpGHpg?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 4 100 Frage.png',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly milten2:GuessingQuestion = { // Milten 
        question: "Bonusfrage von Vertigo! -> 500 Gold Frage",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 4 200 Antwort.png",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/iuI80mvfvJc?controls=1&vq=hd1080&autoplay=0", //Fragevideo
        options: ['Edda','Thora', 'Lucia', 'Gritta'],
        index: 1
    }
    static readonly milten3: GuessingQuestion = { // Milten 300
        question: "Gor Na Toth ist ziemlich überrascht, dass Cor Angar mit dem Helden gesprochen hat, weil er \n selbst länger nicht mehr diese Ehre hatte. Wie lange ist es laut seiner Aussage her?",
        video: "https://www.youtube.com/embed/rTvBK6u_psM?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 4 300 Frage.png',
        bonus: false,
        videoQuestion: "", //Fragevideo
        options: ['10 Tage','2 Wochen', '1 Monat', 'Halbes Jahr'],
        index: 2
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "Schätzfrage: Als Novize wird der Held von Cor Kalom losgeschickt Sumpfkraut im Alten Lager zu verkaufen. \n Dort bekommt er für das Kraut eine gewisse Menge Erz. Wenn dieses verloren geht, schimpft Cor Kalom. \n Verständlich, um wie viel Erz geht es hierbei denn?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 4 400 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 4 400 Frage.png',
        bonus: false,
        videoQuestion: "", //Fragevideo
        options: ['1000 Erzbrocken','100 Erzbrocken', '350 Erzbrocken', '500 Erzbrocken'],
        index: 3
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Skip hat einen Bug in seinem Dialog. Hier sollte er was anderes sagen, doch die Vertonung spielt nicht mit. \n So wiederholt er einen Satz und sagt diesen im Laufe des Gesprächs zweimal. Welchen?",
        video: "https://www.youtube.com/embed/J4Ux-2tM4Bc?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 4 500 Frage.png',
        bonus: false,
        videoQuestion: ""
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { // Gorn 100
        question: "ChatGPT meint, sich gut mit der Welt von Gothic auszukennen. Wir „Experten“ wissen jedoch, dass da so einiges \n an Fehlern aufkommen kann, wenn die AI mit seinem Wissen glänzen möchte. Dennoch stellt euch ChatGPT eine Quizfrage. \n Beantwortet sie bitte so, dass sie laut der AI richtig ist.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Kat 5 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200
        question: "Wie lange braucht Cavalorn, um die Banditen zu erledigen? (Ab Dialog Ende bis Dialog)",
        video: "https://www.youtube.com/embed/gysYUFixfQI?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 200 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn3:GuessingQuestion = { // Gorn 300
        question: "Wahr oder Falsch",
        video: "https://www.youtube.com/embed/ebP5jnhYdZE?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/GYPE3CIu7mM?controls=1&vq=hd1080&autoplay=0",
        options: ['falsch, falsch, wahr','wahr, wahr, falsch', 'wahr, wahr, wahr', 'falsch, wahr, wahr'],
        index: 1
    }
    static readonly gorn4:GuessingQuestion = { // Gorn 400
        question: "Was ist das Einzige, was der Eremit nach Jharkendar mitgebracht hat?",
        video: "https://www.youtube.com/embed/bHDUM-kJ-0o?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 400 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Verpflegung','Waffen', 'Magie', 'Gute Laune'],
        index: 3
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Ivan häufiger Name, doch was hinterlässt er uns in G2?",
        video: "https://www.youtube.com/embed/lGU-1LkGbx8?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Kat 5 500 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Waffe','500 Gold', 'Zettel', 'Permatrank'],
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
