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
    const formData = await request.formData();
    let error: string | null = null;
    try {
        await nextMove(params.game, formData.get('player'), [formData.get('row'), formData.get('column')]);
    } catch (e: unknown) {
        if (typeof e === 'object' && e !== null && 'message' in e) {
            error = e.message as string;
        }
    }
    let gameData = await getGame(params.game);
    if (error !== null) {
        gameData = { ...gameData, error };
    }
    return Response.json(gameData);
}
