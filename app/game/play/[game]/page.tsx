import React from "react";
import Link from 'next/link'
import { gameData } from "../../new/route";

export default async function Page(
    { params }: { params: { game: string } }
) {
    const data = await gameData(params.game);
    return (
        <main>
            <h1>Hello, Home page!</h1>
            <pre>{JSON.stringify(data)}</pre>
            { data?.error && (
                <>
                    <p>{data.error}</p>
                    <p><Link href="/game/play">New Game</Link></p>
                </>
            ) }
        </main>
    );
}
