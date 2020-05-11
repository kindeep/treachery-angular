import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CollectionReference } from '@google-cloud/firestore';

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
    processed: boolean;
}

interface Game {
    creatorUid: string;
    guesses: Guess[]
}

// function deepCopy<E>(obj: E): E {
//     return JSON.parse(JSON.stringify(obj));
// }

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
    // const gameSnapshot = await gameDoc.get();
    // const game = gameSnapshot.data() as Game;
    const playersCol = gameDoc.collection('players');
    const players: Player[] = await collectionToArray<Player>(playersCol);

    const playerDoc = (uid: string) => playersCol.doc(uid);

    // Select 'other' forensic cards. 

    const otherCards = getRandom(cards.forensicCards.otherCards, 5);

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
}

async function _addPlayer(gameId: string, playerUid: string, playerName: string) {
    const gameDoc = db.collection('games').doc(gameId);
    // const game = (await gameDoc.get()).data() as Game;
    const playersCol = gameDoc.collection('players');
    // const players = ;
    playersCol.doc(playerUid).set({ uid: playerUid, name: playerName } as Player)
}

// async function _makeGuess(gameId: string, gussedByUid: string, guessedPlayerUid: string, clueCardName: string, meansCardName: string) {
//     const gameDoc = db.collection('games').doc(gameId);
//     let { guesses } = (await gameDoc.get()).data() as Game;
//     guesses = guesses ? guesses : [];
//     const users = gameDoc.collection('users');
//     const forensicPrivateDoc = users.doc(game.creatorUid);
//     const { murderer, murdererClueCardName, murdererMeansCardName } = (await forensicPrivateDoc.get()).data() as ForensicPrivateData;
//     if (murderer.uid === guessedPlayerUid && murdererClueCardName === clueCardName && murdererMeansCardName === meansCardName) {
//         // Correct guess

//         gameDoc.set({ guesses: })
//     } else {
//         // Wrong guess
//     }

// }

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
    // const text = data.text;
    // console.log(data);
    console.log(`Start game: ${gameId}`);
    if (context && context.auth) {
        // Authentication / user information is automatically added to the request.
        const uid = context.auth.uid;
        console.log(`Triggered by uid: ${uid}`);

        await _startGame(gameId, uid);
        // const name = context.auth.token.name || null;
        // const picture = context.auth.token.picture || null;
        // const email = context.auth.token.email || null;
        // creatorUid: this.authService.user.uid, gameId: this.gameId, createdTimestamp: new Date(), players: []
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

// exports.makeGuess = functions.https.onCall(async ({ gameId, guessedPlayerUid, clueCardName, meansCardName, }, context) => {
//     if (context && context.auth) {
//         const uid = context.auth.uid;
//         console.log(uid);
//         await _makeGuess(gameId, uid, guessedPlayerUid, clueCardName, meansCardName);
//         return { success: true }
//     }
//     else {
//         return { success: false, error: 'Not logged in!' };
//     }
// });

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
        console.log(`logged in, uid: ${context.auth.uid}`)
        const game = (await gameDoc.get()).data() as Game;
        const forensicPrivateDoc = gameDoc.collection('users').doc(game.creatorUid);
        const forensicPrivateData = (await forensicPrivateDoc.get()).data() as ForensicPrivateData;

        if (!newGuess.processed) {
            gameDoc.collection('guesses').add({
                murdererUid: context.auth?.uid,
                processed: true, correct: (
                    forensicPrivateData.murderer.uid === newGuess.murdererUid &&
                    forensicPrivateData.murdererClueCardName === newGuess.clueCardName &&
                    forensicPrivateData.murdererMeansCardName === newGuess.meansCardName
                )
            } as Guess)
        }
    }
    else {
        console.log('Why no logged in...');
        // Remove the record...?
    }
});