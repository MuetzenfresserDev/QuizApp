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
        question: "Xardas schickt den Helden in die Stadt. \n „Die Stadt ist groß, du kannst sie nicht verfehlen.“ \n Das stimmt. Aber welche Möglichkeiten hat der Held, die Torwache zu überzeugen, ihn durchzulassen?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Bestechung, Kräutersammler, Knecht von Lobart, Passierschein, Gilde, Rüstung",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 100 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly held2:GuessingQuestion = { // Held 200
        question: "Der Held ist zum ersten Mal in der Stadt. \n Vatras möchte jedoch erst seine Rede beenden, bevor er mit ihm redet. Wie lange dauert diese?",
        video: "https://www.youtube.com/embed/tD3SRzEvA84?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Held 200 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['3:59','2:28', '6:23', '4:26'],
        index: 3 
    }
    static readonly held3:BuzzerQuestion = { // Held 300
        question: "Vatras hat eine Botschaft für Meister Isgaroth, die der Held überbringen soll. \n Worum geht es in der Botschaft, sinngemäß?",
        kind: "Buzzer-Frage",
        pictureQuestion: "assets/buzzer/Held 300 Frage.png",
        picture: "assets/buzzer/Held 300 Antwort.png",
        options: ['Drachen','Expedition', 'Beliar', 'Diebesgilde'],
        index: 2 
    }
    static readonly held4:GuessingQuestion = { // Held 400
        question: "Bonusfrage von AFGuitar! => 500 Gold Frage",
        video: "https://www.youtube.com/embed/04Bd27SKYCk?controls=1&vq=hd1080&autoplay=00",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/FpWCzlvwGNk?controls=1&vq=hd1080&autoplay=0",
        options: ['32','17', '42', '9'],
        index: 0 
    }
    static readonly held5:VoicelineQuestion = { // Held 500
        question: "Wer sagt das Folgende?",
        voiceLine: "assets/voicelines/Held 500 Frage.mp3",
        kind: "Voiceline-Fragen",
        correctAnswer: "https://www.youtube.com/embed/DLzplZoF_p4?controls=1&vq=hd1080&autoplay=0",
        bonus: false
    }


    /* Diego */
    static readonly diego1: GuessingQuestion = { // Diego 100
        question: "Diego ist endlich wieder in der Stadt. „Ich hab da noch ein paar Rechnungen zu begleichen“, sagte er zum Helden. \n Sein erster Stop ist die Rote Laterne. \n Wie lange braucht Nadja von dieser Position aus, bis sie im oberen Zimmer ankommt?",
        video: "https://www.youtube.com/embed/HK2f31UXgis?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Diego 100 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['0:43','1:01', '0:28', '0:39'],
        index: 0 
    }
    static readonly diego2: GuessingQuestion = { // Diego 200
        question: "Diego der Dieb hat einige Dinge aus dem Oberen Viertel mitgehen lassen. \n Ordne die Gegenstände nach ihrem Wert.",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Diego 200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Diego 200 Frage.png',
        bonus: false,
        videoQuestion: ""
    }
    static readonly diego3:GuessingQuestion= { // Diego 300 -> GEOGUESSR !2!
        question: "Wahr oder Falsch? Entscheide!",
        video: "https://www.youtube.com/embed/dzYQrzwi7mw?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/SWn6ePWzyfY?controls=1&vq=hd1080&autoplay=0",
        options: ['falsch,falsch,falsch','falsch,wahr,wahr', 'wahr falsch wahr', 'falsch wahr falsch'],
        index: 2 
    }
    static readonly diego4: BuzzerQuestion= { // Diego 400
        question: "Taschendiebstahl! Diego beklaut Milten in der Burg der Paladine! \n Keiner hat ihn gesehen. Was hat er bekommen?",
        kind: "Buzzer-Frage",
        pictureQuestion: "assets/buzzer/Diego 400 Frage.png",
        video: "https://www.youtube.com/embed/n0x8y0-TFWU?controls=1&vq=hd1080&autoplay=0",
        options: ['35 Gold','Elixier des Lebens', 'Elixier des Geistes', 'Feuersturm'],
        index: 2 
    }
    static readonly diego5: GuessingQuestion = { // Diego 500 !GEOGUESSER1!
        question: "Ordne die Kasten zu!",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Wer schützte einst das Volk? Kriegerkaste, letztes Wort im Rat der Fünf? Gelehrten, \n Schuld am Übel? Kriegerkaste, Direkten Befehl? Prister, \n Versorgt die Kranken? Heiler",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/DvbUFRvLRl4?controls=1&vq=hd1080&autoplay=0",
        options: ['falsch,falsch,falsch','falsch,wahr,wahr', 'wahr falsch wahr', 'falsch wahr falsch'],
        index: 2 
    }

    /* Lester */
    static readonly lester1:GuessingQuestion= { // Lester 100
        question: "Wie heißt dieses Item?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Lester 100 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Lester 100 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Rubinklinge','Edles Langschwert','Buddlerzucht','Schwert'],
        index: 1 
    }
    static readonly lester2: GuessingQuestion = { // Lester 200
        question: "Lester bekommt vom Schläfer eine Vision. Er sieht folgende 4 Bilder. Was wird hier dargestellt?",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Lester 200 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Lester 200 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['Untote','Armee der Finsternis','Beliars Schergen','Unterwelt'],
        index: 1 
    }
    static readonly lester3:GuessingQuestion = { // Lester 300
        question: "Bonusfrage von Neocromicon! -> 500 Gold Frage",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Lester 300 Antwort.png",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/q_8YxsH6hxQ?controls=1&vq=hd1080&autoplay=0",
        options: ['5.5%','0,1%', '0.25%', '12%'],
        index: 2 
    }
    static readonly lester4: GuessingQuestion = { // Lester 400
        question: "Lester gab dem Helden, als dieser aus dem Minental zurückkehrte, eine Teleport-Rune zu Xardas. Er selbst muss laufen. \n Sein weg führt ihn durch die Stadt. Wie lange braucht er, bis er einen Fuß in die Stadt setzt?",
        video: "https://www.youtube.com/embed/DRUFHSbxnLI?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: 'assets/guessing/pictures/Lester 400 Frage.png',
        bonus: false,
        videoQuestion: "",
        options: ['12:08','6:59', '9:31', '17:00'],
        index: 0 
    }
    static readonly lester5: GuessingQuestion = { // Lester 500 -> Geoguessr !3!
        question: "Wahr oder Falsch? Entscheide!",
        video: "https://www.youtube.com/embed/Dugd5x6b_fM?controls=1&vq=hd1080&autoplay=0",
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: "https://www.youtube.com/embed/ahO503OnznI?controls=1&vq=hd1080&autoplay=0",
        options: ['falsch,falsch,falsch','falsch,wahr,wahr', 'wahr falsch wahr', 'falsch wahr falsch'],
        index: 3 
    }


    /* Milten */
    static readonly milten1:GeoguessrQuestion = { // Milten 100
        question: "Male den Spruchrollen ihre Punkte in der richtigen Farbe!",
        searchPicture: "assets/geoguessr/searchPictures/Milten 100 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 100 Antwort.png",
        imgurLink: "https://i.imgur.com/CFAL2wV.pngg", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: '',
        options: ['Lila,Grün,Lila,Grün','Lila,Gellb,Blau,Grün', 'Lila,Rot,Gelb,Grün', 'Rot,Grün,Gelb,Grün'],
        index: 0
    }
    static readonly milten2:BuzzerQuestion = { // Milten 200
        question: "Jorgen wird von Milten ins Kloster aufgenommen. Er erzählt ihm von seinem großartigen Schiff. \n Wie heißt es?",
        kind: "Buzzer-Frage",
        pictureQuestion: "assets/buzzer/Milten 200 Frage.png",
        video: "https://www.youtube.com/embed/Wf8XT0dTR1w?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly milten3: LocationQuestion = { // Milten 300 GEO SPÄTER
        question: "Milten hat sich verlaufen. Wo befindet er sich? (1)",
        searchPicture: "assets/geoguessr/searchPictures/Milten 300 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Milten 300 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly milten4:BuzzerQuestion = { // Milten 400
        question: "",
        kind: "Buzzer-Frage",
        video: "https://www.youtube.com/embed/ONrGklo_jFY?controls=1&vq=hd1080&autoplay=0",
        audio: "assets/voicelines/Milten 400 Frage.mp3"
    }
    static readonly milten5: GuessingQuestion = { // Milten 500
        question: "Nenne so viele besessene Charaktere, wie möglich! \n (Aus dem Almanach der Besessenen)",
        video: "",
        kind: "Schätz-Frage",
        correctAnswer: "Malak, Vino, Bromor, Engrom, Randolph, Sekob, Brutus, Fernando, Mario",
        picture: "assets/guessing/pictures/Milten 500 Antwort.png",
        pictureQuestion: '',
        bonus: false,
        videoQuestion: ""
    }

    /* Gorn */
    static readonly gorn1:LocationQuestion = { // Gorn 100 GEO SPÄTER
        question: "Gorn hat sich verlaufen. Wo befindet er sich? (2)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 100 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 100 Antwort.png",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly gorn2:GuessingQuestion = { // Gorn 200 
        question: "Bonusfrage von CaptainAlex -> 500 Gold Frage",
        video: "https://www.youtube.com/embed/B3Mw-4p4Jjk?controls=1&vq=hd1080&autoplay=0", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "",
        pictureQuestion: '',
        bonus: true,
        videoQuestion: "https://www.youtube.com/embed/rUc5Lkal-kE?controls=1&vq=hd1080&autoplay=0"
    }
    static readonly gorn3:GeoguessrQuestion = { // Gorn 300 !GEOGUESSER2!
        question: "Gorn schwingt seine Axt. Welche Stufe haben folgende Monster, die er besiegt hat? (G1)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 300 Frage.png",
        kind: "Geo-Frage",
        markedPicture: "assets/geoguessr/markedPictures/Gorn 300 Antwort.png",
        imgurLink: "https://i.imgur.com/Tb75kGn.png", //hier muss das searchPicutre dann noch hochgeladen und eingefügt werden
        bonus: false,
        video: ''
    }
    static readonly gorn4:LocationQuestion = { // Gorn 400 GEO SPÄTER
        question: "Gorn hat sich verlaufen... Wo befindet er sich? (3)",
        searchPicture: "assets/geoguessr/searchPictures/Gorn 400 Frage.png",
        kind: "Location-Frage",
        markedPicture: "assets/geoguessr/searchPictures/Gorn 400 Antwort.webp",
        imgurLink: "https://i.imgur.com/PvDcX8Z.png", //g1Minental
        bonus: false,
    }
    static readonly gorn5: GuessingQuestion = { // Gorn 500
        question: "Lee möchte vom Helden, dass er sich das Vertrauen des Richters besorgt. \n Dieser möchte, dass man den entlaufenden „Banditen“ Morgahard ausfindig macht. \n An welchen Orten sind seine Männer anzutreffen?",
        video: "", //Antwortvideo
        kind: "Schätz-Frage",
        correctAnswer: "",
        picture: "assets/guessing/pictures/Gorn 500 Antwort.png",
        pictureQuestion: 'assets/guessing/pictures/Gorn 500 Frage.png',
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
