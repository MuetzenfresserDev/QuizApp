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

    static readonly pictureSize = {width: '1100', height: '506'};
    static readonly errorPictureSize = {width: '1500', height: '506'};
    static readonly correctedPictureSize = {width: '900', height: '506'}


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
    static readonly held1: BuzzerQuestion = { // Held 100 fehlt noch
        question: "Im Marvin Mode gibt es eine Taste auf der Tastatur, die dem Helden schaden zufügt. \n Welche Taste ist das?",
        kind: "Buzzer-Frage"
    }
    static readonly held2:GuessingQuestion = { //Jahrkendar Portal zu Saturas -> Held 200
        question: "Unser Held möchte im Kloster Innos aufgenommen werden. Nun braucht er jedoch ein Schaf. \n „Tja…“, denkt er sich und verwandelt sich zu einem Schaf. \n Nun läuft er von Pepe aus bis zum Kloster über den normalen weg. Wie lange braucht er für diesen Weg?",
        video: "https://www.youtube.com/embed/zw0mHjcPA0E?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held3:GuessingQuestion = { // Held 300
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/3MK-vNow3dI?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/ACSD3HHiswA?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly held4:ErrorQuestion = { // Held 400
        question: "Finde die Unterschiede in den Bildern",
        errorPicture: "assets/errors/errorPictures/Held 400 Frage.jpg",
        kind: "Fehlersuche-Frage",
        correctedPicture: "assets/errors/correctedPictures/Held 400 Antwort.jpg",
        imgurLink: "https://i.imgur.com/h6XyXRx.jpg",   //gleiche wie errorPicture um darauf dann Fehler zu Markieren.
        bonus: false
    }
    static readonly held5:LocationQuestion = { // Held 500
        question: "Der Held hat sich verlaufen. Wo befindet er sich? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Held 500 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Held 500 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }


    /* Diego */
    static readonly diego1: BuzzerQuestion = { // Diego 100
        question: "Welcher Charakter meint, keine witzigen Kerle zu mögen?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/h4l2r0GRL-8?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly diego2:VoicelineQuestion = { // Diego 200
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/Diego 200 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/i18dmSKmuF8?controls=1&vq=hd1080&autoplay=0",
        bonus: false
    }
    static readonly diego3:LocationQuestion = { // Diego 300
        question: "Diego hat sich vor dir versteckt. Weißt du wo er ist? (4)",
        searchPicture: "assets/geoguessr/searchPictures/Diego 300 Frage.png", //Karte mit markiertem Punkt
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 300 Antwort.png", //Karte mit markiertem Punkt
        imgurLink: "https://i.imgur.com/S2HSbb1.jpg", //Karte von Khorinis
        bonus: false
    }
    static readonly diego4: GuessingQuestion = { //Voiceline Gomez -> Diego 400
        question: "Diego hat unserem Helden geholfen, als Bullit ihn vermöbelt hat. \n Nach seinem Angebot geht er zurück ins Alte Lager. Er GEHT zurück. \n Wie lange braucht er für diesen sicheren Weg, bis er sich auf seine Bank setzen kann?",
        video: "https://www.youtube.com/embed/awbe_veLCrs?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego5: GuessingQuestion = { // Diego 500
        question: "Bonusfrage von RPG Kurga! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/b1Yxi3vkx4U?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/pQjU6nBlsBo?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }

    /* Lester */
    static readonly lester1:GuessingQuestion = { // Lester 100
        question: "Der Schläfer verleiht dem Helden die Fähigkeit zu Cheaten. \n Dieser Cheatet sich direkt am Anfang durch den Story Helper direkt zum Anfang des 6. Kapitels. \n Welches Level erreicht er durch diesen Cheat? (Gothic 1)",
        video: "https://www.youtube.com/embed/lsr82hFNiBI?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "" //Fragevideo
    }
    static readonly lester2: GuessingQuestion = { // Lester 200
        question: "Bonusfrage von Belvaria! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/NY6v-BMOks0?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/RVboXVJf3BY?controls=1&vq=hd1080&autoplay=0" //Fragevideo
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "(1. Kapitel) Als Lester in die Stadt kam, beschloss er sich, Schmied zu werden. \n Harald kann ihm einige Waffen beibringen. \n Da dachte sich Lester, er schmiedet jede davon und verkauft jedes 1x. \n Wie viel Gold bekommt er für seine Arbeit?",
        video: "https://www.youtube.com/embed/HZwRNTAg03I?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "1533",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly lester4:GuessingQuestion = { // Lester 400
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/LKarvwiUblc?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/A5hdAzfge6I?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly lester5: ErrorQuestion = { // Lester 500
        question: "Finde die Unterschiede in den Bildern",
        errorPicture: "assets/errors/errorPictures/Lester 500 Frage.jpg",
        kind: "Fehlersuche-Frage",
        correctedPicture: "assets/errors/correctedPictures/Lester 500 Antwort.jpg",
        imgurLink: "https://i.imgur.com/ErIcew6.jpg",   //gleiche wie errorPicture um darauf dann Fehler zu Markieren.
        bonus: false
    }

    /* Milten */
    static readonly milten1:GeoguessrQuestion = { // Milten 100
        question: "Die Karte der heiligen Schreine gibt einen guten Überblick, über die Anzahl der Schreine auf der Insel Khorinis. \n Wie viele Schreine sind in dieser eingezeichnet?",
        searchPicture: "", //bleibt hier leer
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 100 Antwort.png",
        imgurLink: "https://i.imgur.com/S2HSbb1.jpg",
        bonus: false
    }
    static readonly milten2:GeoguessrQuestion = { // Milten 200
        question: "Oh nein! Das Auge Innos wurde aus den Klostermauern gewaltsam entwendet! Pedro, der Verräter war es! \n Schnell, wir müssen das Auge zurückholen! Welchen Weg nahm Pedro? (Von Kloster bis Ziel)",
        searchPicture: "", //bleibt hier leer
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 200 Antwort.png",
        imgurLink: "https://i.imgur.com/S2HSbb1.jpg",
        bonus: false,
    }
    static readonly milten3: BuzzerQuestion = { // Milten 300
        question: "Welche heiligen Reliquien befinden sich im Kloster Innos?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/4cFNpxSeByQ?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly milten4:GuessingQuestion = { // Milten 400
        question: "Die Feuerball Rune aus Gothic 1 ist ein sehr Mächtiger Zauber des dritten Magiekreises. \n Wie viel Mana verbraucht diese Rune, wenn sie ohne Aufladung direkt abgefeuert wird?",
        video: "https://www.youtube.com/embed/WQ5dxjXaQLw?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "Unaufgeladen verbraucht der Zauber 0 Mana.",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly milten5: BuzzerQuestion = { // Milten 500
        question: "Corristo möchte dich in die Reihe der Magier Aufnehmen. Doch zuvor stellt er dir eine Frage, um dich zu prüfen. \n Was ist die höchste Tugend?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/yOoR2wraUew?controls=1&vq=hd1080&autoplay=0"
    }

    /* Gorn */
    static readonly gorn1:LocationQuestion = { // Gorn 100
        question: "Rosi und Till sind von Zuhause abgehauen. Wo findet der Held die beiden nach deren Flucht? (1)",
        searchPicture: "",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 100 Antwort.png",
        imgurLink: "https://i.imgur.com/yEO2dTJ.jpg",
        bonus: false
    }
    static readonly gorn2:LocationQuestion = { // Gorn 200
        question: "Gorn hat sich verlaufen. Wo befindet er sich? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 200 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 200 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly gorn3:VoicelineQuestion = { // Gorn 300
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/Gorn 300 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/t5rSe3UPeIk?controls=1&vq=hd1080&autoplay=0",
        bonus: false
    }
    static readonly gorn4:BuzzerQuestion = { // Gorn 400
        question: "In der freien Mine lebt ein Ork, der Gorn etwas über „Gach Lug“ erzählt. \n Um was handelt es sich hierbei?",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/ST6q8Ds5iiQ?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Was ist das für ein Trank, wie lang hält dieser und wie viel ist er Wert?",
        video: "",
        videoQuestion: "",
        picture: "assets/guessing/pictures/Gorn 500 Antwort.png", 
        pictureQuestion: "assets/guessing/pictures/Gorn 500 Frage.png", 
        kind: "Schätz-Frage",
        correctAnswer: "",
        bonus: false
    }

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
