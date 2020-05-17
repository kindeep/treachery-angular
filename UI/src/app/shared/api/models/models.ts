import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface TgForensicCard {
  cardName: string;
  choices: string[];
  selectedChoice: string;
}

export interface TgCard {
  altImgUrl: string;
  guessedBy: string[];
  imgUrl: string;
  name: string;
}

export interface TgGuess {
  id: string;
  clueCard: string;
  meansCard: string;
  guessedPlayer: string;
  guesserPlayer: string;
  processed: boolean;
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
  causeCard: TgForensicCard;
  locationCard: TgForensicCard;
  otherCards: TgForensicCard[];
  gameId: string;
  createdTimestamp: Timestamp;
  startedTimestamp: Timestamp;
  guesses: TgGuess[];
  murdererSelected: boolean;
  murdererCardsSelected: boolean;
  murdererClueCard: TgCard;
  murdererMeansCard: TgCard;
  murdererName: string;
  startedOn: Timestamp;
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
