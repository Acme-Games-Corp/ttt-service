import { getGame, nextMove } from "../new/route";

export async function GET(
    request: Request,
    { params }: { params: { game: string } }
) {
    const gameData = await getGame(params.game);
    return Response.json(gameData);
}

export async function PATCH(
    request: Request,
    { params }: { params: { game: string } }
) {
    // Todo: error handling - try/catch required here.
    const formData = await request.formData();
    let error = null;
    try {
        await nextMove(params.game, formData.get('player'), [formData.get('row'), formData.get('column')]);
    // Todo: remove explicit any
    } catch (e: any) {
        error = e.message;
    }
    let gameData = await getGame(params.game);
    if (error !== null) {
        gameData = { ...gameData, error  };
    }
    return Response.json(gameData);
}
