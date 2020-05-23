import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CollectionReference, Timestamp } from '@google-cloud/firestore';

admin.initializeApp();

const db = admin.firestore();

interface CardsResource {
    clueCards: Card[];
    meansCards: Card[];
    forensicCards: ForensicCardResource;
}

interface ForensicCard {
    cardName: string;
    choices: string[];
    replaced: boolean;
}

interface ForensicCardResource {
    causeCards: ForensicCard[];
    locationCards: ForensicCard[];
    otherCards: ForensicCard[];
}

interface Card {
    imgUrl: string;
    altImgUrl: string;
    name: string;
}

interface ForensicPrivateData {
    murderer: Player;
    murdererClueCardName: string;
    murdererMeansCardName: string;
}

interface Player {
    uid: string;
    name: string;
    clueCards: Card[];
    meansCards: Card[];
}

interface Guess {
    guessedByUid: string;
    murdererUid: string;
    meansCardName: string;
    clueCardName: string;
    correct: boolean;
}

interface Game {
    creatorUid: string;
    causeCard: ForensicCard;
    locationCard: ForensicCard;
    otherCards: ForensicCard[];
    gameId: string;
    createdTimestamp: Timestamp;
    startedTimestamp: Timestamp;
    murdererSelected: boolean;
    murdererCardsSelected: boolean;
    murdererClueCard: Card;
    murdererMeansCard: Card;
    murdererName: string;
    startedOn: Timestamp;
    finished: boolean;
}

export enum MessageType {
    CHAT = 'chat',
    GUESS = 'guess',
    FORENSIC = 'forensic'
}

export interface Message {
    playerUid: string;
    message: string;
    timestamp: Timestamp;
    type: MessageType;
}

function getRandom<E>(arr: E[], n: number = 1): E[] {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

async function _createGame(gameId: string, creatorUid: string) {
    const game = { gameId, creatorUid, createdTimestamp: new Date() };
    db.collection('games')
        .doc(gameId)
        .set(game);
}

async function collectionToArray<E>(collection: CollectionReference): Promise<E[]> {
    return (await collection.get()).docs.map(doc => doc.data() as E);
}

async function _startGame(gameId: string, creatorUid: string) {
    const gameDoc = db.collection('games').doc(gameId);
    const cardsDoc = await db.collection('resources').doc('cards').get();
    const cards: CardsResource = cardsDoc.data() as CardsResource;
    const playersCol = gameDoc.collection('players');
    const players: Player[] = await collectionToArray<Player>(playersCol);

    const playerDoc = (uid: string) => playersCol.doc(uid);

    // Select 'other' forensic cards. 

    const otherCards = getRandom(cards.forensicCards.otherCards, 6);

    // Distribute cards to players

    const numPlayers = players.length;

    const clueCards = getRandom(cards.clueCards, numPlayers * 4);
    const meansCards = getRandom(cards.meansCards, numPlayers * 4);

    for (let i = 0; i < numPlayers; i++) {
        const { uid } = players[i];
        const selectedClueCards = clueCards.splice(0, 4);
        const selectedMeansCards = meansCards.splice(0, 4)
        playerDoc(uid).set({
            clueCards: selectedClueCards,
            meansCards: selectedMeansCards
        }, { merge: true })
        players[i].clueCards = selectedClueCards
        players[i].meansCards = selectedMeansCards
    }

    // Select murderer.

    const murderer = getRandom(players)[0] as Player;

    // Add murderer info to private data for murderer and forensic.

    await gameDoc.set({ otherCards, startedOn: new Date() }, { merge: true });

    await gameDoc.collection('users').doc(creatorUid).set({ murderer }, { merge: true });

    await gameDoc.collection('users').doc(murderer.uid).set({ isMurderer: true }, { merge: true });

    sendForensicMessage(gameId, "Game started! Murderer, select your cards. Don't let anyone else find out!");
}

async function _selectMurdererCards(gameId: string, murdererUid: string, clueCardName: string, meansCardName: string) {
    const gameDoc = db.collection('games').doc(gameId);
    const users = gameDoc.collection('users');
    const gameSnapshot = await gameDoc.get();
    const game = gameSnapshot.data() as any;

    const murdererPrivateDoc = users.doc(murdererUid);

    await murdererPrivateDoc.set({
        clueCardName,
        meansCardName
    }, { merge: true });

    const forensicPrivateDoc = users.doc(game.creatorUid);

    await forensicPrivateDoc.set({
        murdererClueCardName: clueCardName,
        murdererMeansCardName: meansCardName
    }, { merge: true });

    await gameDoc.set({ murdererCardsSelected: true }, { merge: true })

    sendForensicMessage(gameId, 'Murderer selected their cards. Time to figure out who he is. Good luck!');
}

async function _addPlayer(gameId: string, playerUid: string, playerName: string) {
    const gameDoc = db.collection('games').doc(gameId);
    const playersCol = gameDoc.collection('players');
    playersCol.doc(playerUid).set({ uid: playerUid, name: playerName } as Player)
}

exports.createGame = functions.https.onCall(async ({ gameId }, context) => {
    console.log(`Create game: ${gameId}`);
    if (context && context.auth) {
        const uid = context.auth.uid;
        console.log(`Triggered by uid: ${uid}`);

        await _createGame(gameId, uid);

        return { success: true }

    } else {
        console.error('User not authenticated!');
        return { success: false }
    }
});

exports.startGame = functions.https.onCall(async ({ gameId }, context) => {
    // Message text passed from the client.
    console.log(`Start game: ${gameId}`);
    if (context && context.auth) {
        // Authentication / user information is automatically added to the request.
        const uid = context.auth.uid;
        console.log(`Triggered by uid: ${uid}`);

        await _startGame(gameId, uid);
        return { success: true };
    } else {
        return { success: false, error: 'User not authenticated' };
        console.error('User not authenticated!');
    }
});

exports.addPlayer = functions.https.onCall(async ({ gameId, playerName }, context) => {
    if (context && context.auth) {
        const uid = context.auth.uid;
        console.log(uid);
        await _addPlayer(gameId, uid, playerName);
        return { success: true };
    } else {
        return { success: false, error: 'Not logged in!' };
    }
});

exports.selectMurdererCards = functions.https.onCall(async ({ gameId, clueCardName, meansCardName }, context) => {
    if (context && context.auth) {
        const uid = context.auth.uid;
        console.log(uid);
        await _selectMurdererCards(gameId, uid, clueCardName, meansCardName);
        return { success: true }
    }
    else {
        return { success: false, error: 'Not logged in!' };
    }
});

function sendMessage(gameId: string, message: string, type: MessageType = MessageType.CHAT, playerUid: string) {
    db.collection('games').doc(gameId).collection('messages').add({
        playerUid,
        message,
        type,
        timestamp: Timestamp.now()
    })
}

function sendForensicMessage(gameId: string, message: string) {
    db.collection('games').doc(gameId).collection('messages').add({
        message,
        type: MessageType.FORENSIC,
        timestamp: Timestamp.now()
    })
}

exports.makeGuess = functions.https.onCall(async ({ gameId, clueCardName, meansCardName, murdererUid }, context) => {
    const gameDoc = db.collection('games').doc(gameId);
    if (context.auth) {
        const uid = context.auth.uid;
        const newGuess = {
            clueCardName,
            meansCardName,
            murdererUid,
            guessedByUid: uid
        } as Guess;

        const guessedPlayerDoc = gameDoc.collection('players').doc(murdererUid);
        const guessedPlayerData = (await guessedPlayerDoc.get()).data() as Player;

        const game = (await gameDoc.get()).data() as Game;
        const forensicPrivateDoc = gameDoc.collection('users').doc(game.creatorUid);
        const forensicPrivateData = (await forensicPrivateDoc.get()).data() as ForensicPrivateData;
        const correct = (
            forensicPrivateData.murderer.uid === newGuess.murdererUid &&
            forensicPrivateData.murdererClueCardName === newGuess.clueCardName &&
            forensicPrivateData.murdererMeansCardName === newGuess.meansCardName
        );

        gameDoc.collection('guesses').add({
            correct,
            ...newGuess
        } as Guess)

        sendMessage(gameId, `I think '${guessedPlayerData.name}' is the murderer, with clue '${clueCardName}' and means '${meansCardName}'.`, MessageType.GUESS, uid);
        sendForensicMessage(gameId, correct ? 'That is correct!' : 'Nope.');

        if (correct) {
            gameDoc.set({ finished: true, murdererUid, murdererMeansCardName: meansCardName, murdererClueCardName: clueCardName }, { merge: true })
        }

        return { success: true }
    }
    else {
        return { success: false, error: 'auth error' }
    }
});