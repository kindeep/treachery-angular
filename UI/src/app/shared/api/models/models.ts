import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface TgForensicCard {
  cardName: string;
  choices: string[];
  selectedChoice: string;
  replaced: boolean;
}

export interface TgCard {
  altImgUrl: string;
  guessedBy: string[];
  imgUrl: string;
  name: string;
}

export interface TgGuess {
  guessedByUid: string;
  murdererUid: string;
  meansCardName: string;
  clueCardName: string;
  correct: boolean;
}

export interface TgPartialGuess {
  murdererUid: string;
  meansCardName: string;
  clueCardName: string;
}

export interface TgPlayer {
  name: string;
  uid: string;
  clueCards: TgCard[];
  meansCards: TgCard[];
  guessed: boolean;
}

export enum TgMessageType {
  CHAT = 'chat',
  GUESS = 'guess',
}

export interface TgMessage {
  playerUid: string;
  message: string;
  timestamp: Timestamp;
  type: TgMessageType;
}

export interface TgGame {
  creatorUid: string;
  causeCard: TgForensicCard;
  locationCard: TgForensicCard;
  otherCards: TgForensicCard[];
  gameId: string;
  createdTimestamp: Timestamp;
  startedTimestamp: Timestamp;
  murdererSelected: boolean;
  murdererCardsSelected: boolean;
  murdererClueCardName: string;
  murdererMeansCardName: string;
  murdererUid: string;
  startedOn: Timestamp;
  finished: boolean;
}

export interface TgForensicPrivateData {
  murderer: TgPlayer;
  murdererClueCardName: string,
  murdererMeansCardName: string
}

export interface TgPlayerPrivateData {
  isMurderer: boolean;
  clueCardName: string;
  meansCardName: string;
}

interface TgForensicCardResource {
  causeCards: TgForensicCard[];
  locationCards: TgForensicCard[];
  otherCards: TgForensicCard[];
}

export interface TgCardResources {
  clueCards: TgCard[];
  meansCards: TgCard[];
  forensicCards: TgForensicCardResource;
}

export interface TgMurdererInfo {
  murderer: TgPlayer;
  clueCard: TgCard;
  meansCard: TgCard;
}
