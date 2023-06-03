import { MultiplechoiceQuestion } from "./interfaces/question";

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
            option1: "1111",
            option2: "2222",
            option3: "3333",
            option4: "4444",
        },
        kind: 'Multiple-Choice-Fragen',
        correctAnswer: '4444'
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

   /*  b2question1: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b2question2: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b2question3: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b2question4: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b2question5: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }

    b3question1: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b3question2: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b3question3: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b3question4: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b3question5: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    

    b4question1: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b4question2: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b4question3: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b4question4: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b4question5: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    

    b5question1: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b5question2: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b5question3: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b5question4: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    }
    b5question5: Question = {
        question: "",
        options: {
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: ''
        }
    } */
    

    static readonly multiplechoiceQuestions: MultiplechoiceQuestion[]  = [this.multiplechoice1,this.multiplechoice2,this.multiplechoice3,this.multiplechoice4,this.multiplechoice5]
    /* block2 = [this.b2question1,this.b2question2,this.b2question3,this.b2question4,this.b2question5]
    block3 = [this.b3question1,this.b3question2,this.b3question3,this.b3question4,this.b3question5]
    block4 = [this.b4question1,this.b4question2,this.b4question3,this.b4question4,this.b4question5]
    block5 = [this.b5question1,this.b5question2,this.b5question3,this.b5question4,this.b5question5] */
}
