import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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
    murdererUid: string;
    murdererMeansCardName: string;
    murdererClueCardName: string;
}

interface Player {
    uid: string;
    name: string;
    clueCards: Card[];
    meansCards: Card[];
}

interface Game {
    players: Player[];
}

function deepCopy<E>(obj: E): E {
    return JSON.parse(JSON.stringify(obj));
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
    const game = { gameId, creatorUid, createdTimestamp: new Date(), players: [] };
    db.collection('games')
        .doc(gameId)
        .set(game);
    createGameTimer(gameId);
}

async function _startGame(gameId: string, creatorUid: string) {
    const gameDoc = db.collection('games').doc(gameId);
    const cardsDoc = await db.collection('resources').doc('cards').get();
    const cards: CardsResource = cardsDoc.data() as CardsResource;
    const gameSnapshot = await gameDoc.get();
    const game = gameSnapshot.data() as any;

    // Select 'other' forensic cards. 

    const otherCards = getRandom(cards.forensicCards.causeCards, 5);

    // Distribute cards to players

    const numPlayers = game.players.length;

    const causeCards = getRandom(cards.clueCards, numPlayers * 4);
    const meansCards = getRandom(cards.meansCards, numPlayers * 4);

    for (let i = 0; i < numPlayers; i++) {
        game.players[i].causeCards = causeCards.splice(0, 4);
        game.players[i].meansCards = meansCards.splice(0, 4);
    }

    // Select murderer.

    const murderer = getRandom(game.players)[0] as any;

    // Add murderer info to private data for murderer and forensic.

    await gameDoc.set({ ...game, otherCards });

    await gameDoc.collection('users').doc(creatorUid).set({ murderer });

    await gameDoc.collection('users').doc(murderer.uid).set({ isMurderer: true });

    // Start game timers...

    startGameTimer(gameId);
}

async function createGameTimer(gameId: string) {
    // Expire game after 10 minutes
    setTimeout(async () => {
        const gameDoc = db.collection('games').doc(gameId);
        const game = await gameDoc.get();
        await gameDoc.set({ ...game, expired: true });
    }, 1000 * 60 * 10)
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

async function startGameTimer(gameId: string) {
    const gameDoc = db.collection('games').doc(gameId);
    const users = gameDoc.collection('users');
    const { creatorUid } = (await gameDoc.get()).data() as any;
    const forensicPrivateDoc = users.doc(creatorUid);
    const tempForensicPrivateData = (await forensicPrivateDoc.get()).data() as ForensicPrivateData;
    const murdererDoc = users.doc(tempForensicPrivateData.murdererUid);
    // Murderer cards selection
    setTimeout(async () => {
        const forensicPrivateData = (await forensicPrivateDoc.get()).data() as ForensicPrivateData;
        const game = (await gameDoc.get()).data() as Game;

        if (forensicPrivateData && forensicPrivateData.murdererClueCardName && forensicPrivateData.murdererMeansCardName) {

        } else {
            // Select random cards.
            const murdererIndex = game.players.findIndex((player: Player) => player.uid === forensicPrivateData.murdererUid);
            const murderer: Player = game.players[murdererIndex];
            const selectedClueCardName = getRandom(murderer.clueCards)[0].name;
            const selectedMeansCardName = getRandom(murderer.meansCards)[0].name;

            forensicPrivateDoc.set({
                murdererClueCardName: selectedClueCardName,
                murdererMeansCardName: selectedMeansCardName
            }, { merge: true });

            murdererDoc.set({
                clueCardName: selectedClueCardName,
                meansCardName: selectedMeansCardName
            }, { merge: true })

            gameDoc.set({
                murdererCardsSelected: true
            }, { merge: true })

        }
    }, 1000 * 30);
    // Forensic clue card selection
    setTimeout(() => { }, 1000 * 60);
    // Forensic location card selection
    setTimeout(() => { }, 1000 * 90);
    // Forensic other card 1 selection
    setTimeout(() => { }, 1000 * 120);
    // Forensic other card 2 selection
    setTimeout(() => { }, 1000 * 150);
    // Forensic other card 3 selection
    setTimeout(() => { }, 1000 * 180);
    // Forensic other card 4 selection
    setTimeout(() => { }, 1000 * 210);
    // Forensic other card 5 selection
    setTimeout(() => { }, 1000 * 240);
    // Game end 
    setTimeout(() => { }, 1000 * 270)
}

async function _addPlayer(gameId: string, playerUid: string, playerName: string) {
    const gameDoc = db.collection('games').doc(gameId);
    const game = (await gameDoc.get()).data() as Game;
    const players = deepCopy(game.players);
    players.push({ uid: playerUid, name: playerName } as Player)
    await gameDoc.set({ players }, { merge: true })
}

exports.createGame = functions.https.onCall(async ({ gameId }, context) => {
    // Message text passed from the client.
    // const text = data.text;
    // console.log(data);
    console.log(`Create game: ${gameId}`);
    if (context && context.auth) {
        // Authentication / user information is automatically added to the request.
        const uid = context.auth.uid;
        console.log(`Triggered by uid: ${uid}`);

        await _createGame(gameId, uid);
        // const name = context.auth.token.name || null;
        // const picture = context.auth.token.picture || null;
        // const email = context.auth.token.email || null;
        // creatorUid: this.authService.user.uid, gameId: this.gameId, createdTimestamp: new Date(), players: []

    } else {
        console.error('User not authenticated!');
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

    } else {
        console.error('User not authenticated!');
    }
});

exports.addPlayer = functions.https.onCall(async ({ gameId, playerName }, context) => {
    // Message text passed from the client.
    // const text = data.text;
    if (context && context.auth) {
        // Authentication / user information is automatically added to the request.
        const uid = context.auth.uid;
        // const name = context.auth.token.name || null;
        // const picture = context.auth.token.picture || null;
        // const email = context.auth.token.email || null;
        console.log(uid);
        await _addPlayer(gameId, uid, playerName);
    }
    // return await _createGame();
});

exports.selectMurdererCards = functions.https.onCall(async ({ gameId, clueCardName, meansCardName }, context) => {
    if (context && context.auth) {
        const uid = context.auth.uid;
        console.log(uid);
        await _selectMurdererCards(gameId, uid, clueCardName, meansCardName);
    }
});

