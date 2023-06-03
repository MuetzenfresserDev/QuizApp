import { MultiplechoiceQuestion, VoicelineQuestion } from "./interfaces/question";

export class ConstQuestions {

    static readonly whiteboardUrls: string[] = [
        'https://www.whiteboard.team/app/board/aViirb3789u1QsNrKgRNjGjyO',  //Spieler 1 Url
        'https://www.whiteboard.team/app/board/JWsnlPZ5ogasZB0KeElTnjCAY',  //Spieler 2 Url
        'https://www.whiteboard.team/app/board/txZGAIMXIWtLTWtI9CmN~ZT4d',  //Spieler 3 Url
        'https://www.whiteboard.team/app/board/eb~TBAt5D5ray2LBIqTH.yV5k'   //Spieler 4 Url
      ];

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

    static readonly multiplechoiceQuestions: MultiplechoiceQuestion[]  = [this.multiplechoice1,this.multiplechoice2,this.multiplechoice3,this.multiplechoice4,this.multiplechoice5]
    static readonly voicelineQuestions: VoicelineQuestion[] = [this.voiceline1, this.voiceline2, this.voiceline3, this.voiceline4, this.voiceline5 ]

}
