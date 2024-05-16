'use client';

import React, { use } from "react";
import Link from 'next/link'
import { DebugForm } from "./debug_play";
import { useEffect, useState } from "react";


export function Board ({ game }: { game: string }) {
    // Todo: get rid of explicit any
    const defaultBoardState: any = {};
    const [boardState, setBoardState] = useState(defaultBoardState);
    useEffect(() => {
        fetch(`/game/${game}`, {
            method: 'GET',
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                setBoardState(data);
            });
        });
        
    }, []);
    return (
        <main>
            <h1>Hello, Home page!</h1>
            <pre>{JSON.stringify(boardState)}</pre>
            { boardState?.error && (
                <>
                    <p>{boardState.error}</p>
                    <p><Link href="/game/play">New Game</Link></p>
                </>
            ) }
            {/* Use debug inputs to write JSON for patches to the game. */}
            { !boardState?.error && 
                <DebugForm game={game} setBoardState={setBoardState} />
            }
        </main>
    );
}