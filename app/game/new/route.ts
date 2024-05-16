import { v4 as uuidv4 } from 'uuid';
// Todo: gotta fix how this is imported
import { newGame } from 'tictactoe';

let currentGame: string | null = null;
// Todo: get away from the any type, here.
const games: { [key: string]: any } = {};

export function clearGame () {
    currentGame = null;
}

// Todo: improve types
export async function nextMove (game: string, player: FormDataEntryValue  | null, position: (FormDataEntryValue | null)[]) {
    if (currentGame === game) {
        games[currentGame].nextMove(player, [parseInt(position[0] as string), parseInt(position[1] as string)]);
        return (gameData(currentGame));
    }
    return ({
        error: 404
    });
}

export async function gameData (game: string) {
    if (game === null) {
        return null;
    }
    if (games[game] === undefined) {
        return ({
            error: 404,
        });
    }
    return ({
        game,
        board: games[game].getBoard(),
        turn: games[game].lastPlayer() === 'x' ? 'o' : 'x',
        winner: games[game].winner()
    });
}

export async function getGame (game: string) {
    if (currentGame === game) {
        return (gameData(currentGame));
    }
    return ({
        error: 404
    });
}

export async function initiateGame (user: string) {
    if (currentGame === null) {
        currentGame = uuidv4();
        games[currentGame] = newGame();
    }
    return currentGame;
}

// Todo: turn into a POST
export async function GET(
    request: Request
) {
    initiateGame('none');
    return Response.json({ game: currentGame });
}

export async function POST(
    request: Request
) {
    initiateGame('none');
    return Response.json({ game: currentGame });
}
