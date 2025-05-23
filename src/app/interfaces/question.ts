export interface MultiplechoiceQuestion {
    question: string;
    options: Answer;
    kind: string;
    correctAnswer: string;
    bonus: boolean;
}

export interface VoicelineQuestion {
    question: string;
    voiceLine: string;
    kind: string;
    correctAnswer: string;
    bonus: boolean;
    options?: string[];
    index?: number;
    pictureAnswer?: string;
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
    imgurLink: string;
    bonus: boolean;
    options?: string[];
    index?: number;
}

export interface GeoguessrQuestion {
    question: string;
    searchPicture: string;
    kind: string;
    markedPicture: string;
    imgurLink: string;
    bonus: boolean;
    answer?: string;
    video?: string;
    options?: string[];
    index?: number;
}

export interface GuessingQuestion {
    question: string;
    video: string;
    videoQuestion: string,
    picture: string;
    pictureQuestion: string;
    kind: string;
    correctAnswer: string;
    bonus: boolean;
    options?: string[];
    index?: number;
}

export interface LocationQuestion {
    question: string;
    searchPicture: string;
    kind: string;
    markedPicture: string;
    imgurLink: string;
    bonus: boolean;
    searchVideo?: string;
    answerVideo?: string;
}

export interface BuzzerQuestion {
    question: string;
    kind: string;
    video?: string;
    videoQuestion?: string;
    audio?: string;
    audioAnswer?: string;
    picture?: string;
    pictureQuestion?: string;
    options?: string[];
    index?: number;
    imgurLink?: string;
}