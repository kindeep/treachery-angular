import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface ForensicCardSnapshot {
  cardName: string;
  choices: string[];
  selected: boolean;
  selectedChoice: number;
}

export class SampleForensicCardSnapshot implements ForensicCardSnapshot {
  cardName = 'Ho Ho Ho';
  choices = ['Umm', 'sure', 'ok?'];
  selected = false;
  selectedChoice = 2;
}

export interface CardSnapshot {
  altImgUrl: string;
  guessedBy: string[];
  imgUrl: string;
  name: string;
}

export class DefaultCardSnapshot implements CardSnapshot {
  altImgUrl = 'https://picsum.photos/800';
  guessedBy: string[] = [];
  imgUrl = 'https://picsum.photos/800';
  name = 'Loading...';
}

export interface GuessSnapshot {
  clueCard: string;
  guessedPlayer: string;
  guesserPlayer: string;
  id: string;
  meansCard: string;
  processed: boolean;
}

export interface PlayerSnapshot {
  playerName: string;
  clueCards: CardSnapshot[];
  meansCards: CardSnapshot[];
  guessed: boolean;
}

export class DefaultPlayerSnapshot implements PlayerSnapshot {
  playerName = 'Loading...';
  clueCards: DefaultCardSnapshot[] = [];
  meansCards: DefaultCardSnapshot[] = [];
  guessed = false;
}

export interface MessageSnapshot {
  playerName: string;
  message: string;
  timestamp: Timestamp;
  type: number;
}

export interface GameInstanceSnapshot {
  causeCard: ForensicCardSnapshot;
  causeCardDefined: boolean;
  correctGuess: GuessSnapshot;
  correctlyGuessed: boolean;
  createdTimestamp: Timestamp;
  expiredTimestamp: Timestamp;
  startedTimestamp: Timestamp;
  gameId: string;
  guesses: GuessSnapshot[];
  guessesExpired: boolean;
  locationCard: ForensicCardSnapshot;
  locationCardDefined: boolean;
  messages: MessageSnapshot[];
  murdererCardsDetermined: boolean;
  murdererClueCard: CardSnapshot;
  murdererMeansCard: CardSnapshot;
  murdererName: string;
  murdererSelected: boolean;
  otherCards: ForensicCardSnapshot[];
  players: PlayerSnapshot[];
  snapshotVersion: string;
  started: false;
}
