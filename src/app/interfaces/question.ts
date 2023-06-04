export interface MultiplechoiceQuestion {
    question: string;
    options: Answer;
    kind: string;
    correctAnswer: string;
}

export interface VoicelineQuestion {
    question: string;
    voiceLine: string;
    kind: string;
    correctAnswer: string;
}

export interface Answer{
    option1: string;
    option2: string;
    option3: string;
    option4: string;
}

export interface ErrorQuestion {
    question: string;
    errorPicture: string;
    kind: string;
    correctedPicture: string;
}