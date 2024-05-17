'use client';

import React, { use } from "react";
import Link from 'next/link'
import { DebugForm } from "./debug_play";
import { useEffect, useState } from "react";

import './board.css';

export function Board ({ game }: { game: string }) {
    // Todo: get rid of explicit any
    const defaultBoardState: any = {};
    const [boardState, setBoardState] = useState(defaultBoardState);
    useEffect(() => {
        fetch(`/game/${game}`, {
            method: 'GET',
        }).then((response) => {
            response.json().then((data) => {
                setBoardState(data);
            });
        });
        
    }, []);
    return (
        <main>
            {/* <h1>Hello, Home page!</h1> */}
            <div>
                <div className="board">
                    { boardState && boardState.board &&
                        boardState
                            .board
                            .flat()
                            .map((val: string, i: number) => 
                                { 
                                    if (val !== null) {
                                        return (<span key={i}>{val}</span>);
                                    } else {
                                        return (
                                            <span key={i}>
                                                <button onClick={(evt) => {
                                                    evt.preventDefault();
                                                    const data = new FormData();
                                                    data.set('player', boardState.turn);
                                                    data.set('row', String(Math.floor(i/3)));
                                                    data.set('column', String(Math.floor(i%3)));
                                                    fetch(`/game/${game}`, {
                                                      method: 'PATCH',
                                                      body: data,
                                                    }).then((response) => {
                                                        response.json().then((data) => {
                                                            setBoardState(data);
                                                        });
                                                    });
                                                }}>&nbsp;</button>
                                            </span>
                                        );
                                    }
                                })
                    }
                </div>
            </div>
            <pre>{JSON.stringify(boardState)}</pre>
            { boardState && boardState.over && (
                <>
                    <h1>Winner: {boardState.winner || 'tie!'}</h1>
                    <p><Link href="/game/play">New Game</Link></p>
                </>
            ) }
            { boardState && boardState.over === null && (
                <h1>It is now {boardState.turn} turn.</h1>
            ) }
            <p>{boardState.winner}</p>
            { boardState?.error && (
                <>
                    <p>{boardState.error}</p>
                    <p><Link href="/game/play">New Game</Link></p>
                </>
            ) }
            {/* Use debug inputs to write JSON for patches to the game. */}
            {/* { !boardState?.error && 
                <DebugForm game={game} setBoardState={setBoardState} />
            } */}
        </main>
    );
}