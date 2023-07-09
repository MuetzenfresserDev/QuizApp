import { BuzzerQuestion, ErrorQuestion, GeoguessrQuestion, GuessingQuestion, LocationQuestion, MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    static readonly clientId: string = '38c4dfef2a0e8aba637ea15987ba542f';

    static readonly whiteboardUrls: string[] = [
        '7f3bd35f-d647-4f10-9acd-56d34f446d82',  //Spieler 1 Url
        '8a647b8b-27da-4001-8b1a-b06fb978ff76',  //Spieler 2 Url
        '58bda352-1363-4b4a-8e17-2f9f8755a925',  //Spieler 3 Url
        'e561cc9f-cb97-4031-b8f8-a1b0ad875676'   //Spieler 4 Url
      ];

    static readonly youtubeRef: string = 'https://www.youtube.com/embed/dRnH2cU3_m4?controls=0&vq=hd1080&autoplay=1&mute=1&playlist=dRnH2cU3_m4&loop=1'; //Hintergrund Video

    static readonly videoSize = {width: '900', height: '506'};

    static readonly pictureSize = {width: '900', height: '506'};
    static readonly errorPictureSize = {width: '1800', height: '506'};


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
    static readonly held1: VoicelineQuestion = { //Voiceline Tom -> Held 100
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/steine.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/kNRLGNcU9Po?controls=1&vq=hd1080&autoplay=1",
        bonus: false
    }
    static readonly held2:GuessingQuestion = { //Jahrkendar Portal zu Saturas -> Held 200
        question: "Unser Held ist durch das Portal nach Jharkendar geschritten. Keine Spur von den \n Wassermagiern! Er läuft auf direktem Wege aus dem „Tempel“ raus und lässt sich  \n nicht ablenken, bis er auf Saturas trifft. Wie lange läuft er?",
        video: "https://www.youtube.com/embed/3XJzJ9yFQLs?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held3:GuessingQuestion = { //Bonusfrage5 -> 2 Videos -> Held 300
        question: "Bonusfrage von Cedricun! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/V5jeigmOrmo?controls=1&vq=hd1080&autoplay=1", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/H8C1F5gSGcs?controls=1&vq=hd1080&autoplay=1" //Fragevideo
    }
    static readonly held4:GuessingQuestion = { //Lehmar und seine Zinsen -> Held 400
        question: "Lehmer, der Geldverleiher, schmeißt den Leuten sein Geld hinterher. Nach seiner Meinung \n ist das allerdings nicht so. Er berechnet nämlich einen gewissen Prozentsatz. \n Wie hoch ist dieser bei pünktlicher und bei verspäteter Abgabe des Goldes?",
        video: "https://www.youtube.com/embed/dua_pDcpVFs?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "Er verlangt 30% Zinsen bei verspäteter und 20% bei rechtzeitiger Rückzahlung.",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held5:GuessingQuestion = { //Zeit seit Schläfertempel -> Held 500
        question: "Ein einzelner Gefangener… hatte das Schicksal von hunderten geändert. \n So beginnt das Intro von Gothic 2. Wie viel Zeit ist nach dem \n Einsturz des Schläfertempels und dem Beginn des Spiels laut Intro vergangen?",
        video: "https://www.youtube.com/embed/bOjyTKY_GcQ?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }


    /* Diego */
    static readonly diego1: GuessingQuestion = { // Warenlager -> Diego 100
        question: "Welchen unterschied gibt es im Warenlager zwischen DNDR und Classic?",
        video: "",
        videoQuestion: "",
        picture: "assets/guessing/pictures/Diego 100 - Antwort.jpg",
        pictureQuestion: "assets/guessing/pictures/Diego 100 - Frage.jpg",
        kind: "Schätz-Frage",
        correctAnswer: "",
        bonus: false
    }
    static readonly diego2:GuessingQuestion = { //König Rhobar -> Diego 200
        question: "Im Intro zu Gothic 1 sehen wir König Rhobar. \n Welche aus Gothic 1 „bekannte“ Rüstung trägt er?",
        video: "https://www.youtube.com/embed/f_xIDcAXm6w?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "König Rhobar trägt im Intro Gomez Rüstung.",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego3:GuessingQuestion = { //Valentino geld -> Diego 300
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/oxzXJbQI0xc?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/ZjBMpJu4kDk?controls=1&vq=hd1080&autoplay=1"
    }
    static readonly diego4: VoicelineQuestion = { //Voiceline Gomez -> Diego 400
        question: "Von wem stammt die Voiceline?",
        voiceLine: "assets/voicelines/dummheit.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/v8QyLWdTdso?controls=1&vq=hd1080&autoplay=1",
        bonus: false
    }
    static readonly diego5: LocationQuestion = { //GEO HOSCHPAKHÖHLE -> Diego 500
        question: "Wo befindet sich Diego?",
        searchPicture: "assets/geoguessr/searchPictures/Diego 500 - Frage.jpg",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Diego 500 - Antwort.jpg",
        imgurLink: "https://i.imgur.com/yEO2dTJ.jpg",
        bonus: false
    }

    /* Lester */
    static readonly lester1:GuessingQuestion = { //Bonusfrage4 -> 2 Videos -> Lester 100
        question: "Bonusfrage von RPG Kurga! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/m4-t1-uwl-Q?controls=1&vq=hd1080&autoplay=1", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/asVOoMeByeA?controls=1&vq=hd1080&autoplay=1" //Fragevideo
    }
    static readonly lester2: GeoguessrQuestion = { //GEO STEINKREIS -> Lester 200 
        question: "Wo befindet sich Lester?",
        searchPicture: "assets/geoguessr/searchPictures/Lester 200 - Frage.jpg", //Karte mit markiertem Punkt
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Lester 200 - Antwort.jpg", //Karte mit markiertem Punkt
        imgurLink: "https://i.imgur.com/S2HSbb1.jpg", //Karte von Khorinis
        bonus: false
    }
    static readonly lester3:GuessingQuestion = { //Wie alt Bruderschaft -> Lester 300
        question: "Wie lange gibt es die Bruderschaft des Schläfers zu Beginn von Gothic 1?",
        video: "https://www.youtube.com/embed/2iAO9JbJfTQ?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "Die Bruderschaft Existiert bei der ankunft des Namenlosen seit 5 Jahren.",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    //Hier fehlen noch die Videos
    static readonly lester4:GuessingQuestion = { //Bonusfrage3 -> 2 Videos -> Lester 400
        question: "JOKER: 1x Abschreiben \n \n \n Mit diesen Joker hat der Spieler einmalig die Möglichkeit, \n eine Lösung eines anderen Spielers zu übernehmen.",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/bonus/joker.png',
        bonus: true,
        videoQuestion: "" //Fragevideo
    }
    static readonly lester5: ErrorQuestion = { // Neo Bilderrätsel2 -> Lester 500
        question: "Was stimmt auf dem rechten Bild nicht?",
        errorPicture: "assets/errors/errorPictures/Lester500Beides.jpg",
        kind: "Fehlersuche-Frage",
        correctedPicture: "assets/errors/correctedPictures/Lester 500 - Antwort.jpg",
        imgurLink: "https://i.imgur.com/k09JacM.jpg",   //gleiche wie errorPicture um darauf dann Fehler zu Markieren.
        bonus: false
    }

    /* Milten */
    static readonly milten1:GuessingQuestion = { //Steintafeln -> Milten 100
        question: "Die Wassermagier in Jharkendar suchen Steintafeln. \n Dabei sind die Steintafeln aus den Herrenhäusern ganz besonders wichtig. \n Welche Farben haben diese fünf Steintafeln?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Rot, Grün, Gelb, Violet, Blau",
        picture: 'assets/guessing/pictures/Milten 100 - Antwort.jpg',
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly milten2:GuessingQuestion = { //Bonusfrage2 -> 2 Videos -> Milten 200
        question: "Bonusfrage von GreyTo! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/aoeQ8Tfs4Fo?controls=1&vq=hd1080&autoplay=1", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/n9vhpQeH8dE?controls=1&vq=hd1080&autoplay=1" //Fragevideo
    }
    static readonly milten3: GeoguessrQuestion = { //GEO KIRCHENSPITZE -> Milten 300
        question: "Wo befindet sich Milten?",
        searchPicture: "assets/geoguessr/searchPictures/Milten 300 - Frage.jpg",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 300 - Antwort.jpg",
        imgurLink: "https://i.imgur.com/S2HSbb1.jpg",
        bonus: false
    }
    static readonly milten4:GuessingQuestion = { //Milten und sein Gold -> Milten 400
        question: "(G2 DndR) Erfolgreiche Sammelei! Als Milten in die Stadt kam, beschloss er bei Constantino In die Lehre zu gehen. \n Scheint ihm etwas sicherer als ein Jäger zu werden. Er kommt zurück aus dem Wald und hat Pilze dabei. \n In seinen Taschen befinden sich 58 Gold, 15 Dunkelpilze und 25 mal Buddlerfleisch. \n „Ah! Das sind die besten! Gut gemacht!“ sagt der Meister und belohnt den Magier mit Gold. \n  Nun kauft er sich das Buch „Die göttliche Kraft der Gestirne“ um sich zu bilden. Wie viel Gold bleibt ihm?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "15X Dunkelpilz=150 Gold, 25 mal Buddlerfleisch=750 Gold, 58 Goldstücke = 958 Gold \n Kauft 1x Die göttliche Kraft der Gestirne = 400 Goldstücke. \n Somit bleiben Milten noch 558 Goldstücke.",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly milten5: GuessingQuestion = { // Ring füllen -> Milten 500
        question: "Was ist das für ein Ring, welche Werte hat dieser und wie hoch ist sein Wert?",
        video: "",
        videoQuestion: "",
        picture: "assets/guessing/pictures/Milten 500 - Antwort.jpg",
        pictureQuestion: "assets/guessing/pictures/Milten 500 - Frage.jpg",
        kind: "Schätz-Frage",
        correctAnswer: "",
        bonus: false
    }

    /* Gorn */
    static readonly gorn1:GuessingQuestion = { //Laufen bis zu Sentenza -> Gorn 100
        question: "Der Weg von dem Osttor zum Hof des Großbauern ist nicht ungefährlich. Aber unser Held hat Glück! \n Ihm begegnen keine wilden Monster. Er lässt sich nicht ablenken und läuft über die Wege bis er \n schlussendlich von Sentenza aufgehalten wird. Wie lange läuft er?",
        video: "https://www.youtube.com/embed/dapU2l3miG0?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn2:GuessingQuestion = { //Bonusfrage1 -> 2 Videos -> Gorn 200
        question: "Bonusfrage von evilSeven! -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/d8JYDcGtwLI?controls=1&vq=hd1080&autoplay=1", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/wLA5b6bk0wA?controls=1&vq=hd1080&autoplay=1" //Fragevideo
    }
    static readonly gorn3:GuessingQuestion = { //Stärke sortieren -> Gorn 300
        question: "Wahr oder Falsch?",
        video: "https://www.youtube.com/embed/ogV4-e2881E?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/7tS84k49ZGI?controls=1&vq=hd1080&autoplay=1"
    }
    static readonly gorn4:GuessingQuestion = { //Auge Innos -> Gorn 400
        question: "Du spielst das Spiel Gothic 2 Die Nacht des Raben und hast vor kurzem das Auge Innos gerettet. \n Nun weigert sich Xardas zum Umkehrritual aufzubrechen um das Auge seine alte Macht zu verleihen. Warum?",
        video: "https://www.youtube.com/embed/grqbYImxQdU?controls=1&vq=hd1080&autoplay=1",
        kind: "Schätz-Frage",
        correctAnswer: "Der Namelose gehört noch nicht der höheren Gilde an. (Paladin oder Drachenjäger)",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }
    static readonly gorn5: ErrorQuestion = { // Neo Bilderrätsel1 -> Gorn 500
        question: "Was stimmt auf dem rechten Bild nicht?",
        errorPicture: "assets/errors/errorPictures/Gorn500Beide.jpg",
        kind: "Fehlersuche-Frage",
        correctedPicture: "assets/errors/correctedPictures/Gorn 500 - Antwort.jpg",
        imgurLink: "https://i.imgur.com/YovUT7T.jpg",   //gleiche wie errorPicture um darauf dann Fehler zu Markieren.
        bonus: false
    }

    /* nameless */ static readonly questions1: any[]  = [this.held1, this.held2, this.held3, this.held4, this.held5]
    /* diego */ static readonly questions2: any[] = [this.diego1, this.diego2, this.diego3, this.diego4, this.diego5]
    /* lester */ static readonly questions3: any[] = [this.lester1, this.lester2, this.lester3, this.lester4, this.lester5]
    /* milten */ static readonly questions4: any[] = [this.milten1, this.milten2, this.milten3, this.milten4, this.milten5]
    /* gorn */ static readonly questions5: any[] = [this.gorn1,this.gorn2, this.gorn3,this.gorn4, this.buzzerExample]

    static readonly questions = {
        questions1: this.questions1,
        questions2: this.questions2,
        questions3: this.questions3,
        questions4: this.questions4,
        questions5: this.questions5
    }
}
