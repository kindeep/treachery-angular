import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface TgForensicCard {
  cardName: string;
  choices: string[];
  selected: boolean;
  selectedChoice: number;
}

export class SampleForensicCardSnapshot implements TgForensicCard {
  cardName = 'Ho Ho Ho';
  choices = ['Umm', 'sure', 'ok?'];
  selected = false;
  selectedChoice = 2;
}

export interface TgCard {
  altImgUrl: string;
  guessedBy: string[];
  imgUrl: string;
  name: string;
}

export class DefaultCardSnapshot implements TgCard {
  altImgUrl = 'https://picsum.photos/800';
  guessedBy: string[] = [];
  imgUrl = 'https://picsum.photos/800';
  name = 'Loading...';
}

export interface TgGuess {
  id: string;
  clueCard: string;
  meansCard: string;
  guessedPlayer: string;
  guesserPlayer: string;
  processed: boolean;
}

export interface TgPlayer {
  playerName: string;
  clueCards: TgCard[];
  meansCards: TgCard[];
  guessed: boolean;
}

export class DefaultTgPlayer implements TgPlayer {
  playerName = 'Loading...';
  clueCards: DefaultCardSnapshot[] = [];
  meansCards: DefaultCardSnapshot[] = [];
  guessed = false;
}

export enum TgMessageType {
  ONE,
  TWO,
}

export interface TgMessage {
  playerName: string;
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
  murdererCardsDetermined: boolean;
  murdererClueCard: TgCard;
  murdererMeansCard: TgCard;
  murdererName: string;
  players: TgPlayer[];
  started: false;
}
