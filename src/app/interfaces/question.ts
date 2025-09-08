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
    imgurLink?: string;
    imgurLinkImposter?: string;
    imposter?: string; //WHITEBOARD URL DES IMPOSTERS -> 1: 7f3bd35f-d647-4f10-9acd-56d34f446d82 2: 8a647b8b-27da-4001-8b1a-b06fb978ff76 3: 58bda352-1363-4b4a-8e17-2f9f8755a925 4: e561cc9f-cb97-4031-b8f8-a1b0ad875676
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
    searchAudio?: string;
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