'use client';

import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { DebugForm } from "./debug_play";
import type { PositionValue } from "tictactoe";

import './board.css';

export interface BoardState {
    game: string | null,
    board: PositionValue[][] | null,
    turn: PositionValue,
    winner: PositionValue,
    over: boolean | null,
    error: string | null
}

export function Board ({ game }: { game: string }) {
    const router = useRouter()
    const defaultBoardState: BoardState = {
        game: null,
        board: null,
        turn: null,
        winner: null,
        over: null,
        error: null,
    };
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
            <div>
                <div className="board">
                    { boardState && boardState.board &&
                        boardState
                            .board
                            .flat()
                            .map((val: PositionValue, i: number) => 
                                { 
                                    if (val !== null) {
                                        return (<span key={i}>{val}</span>);
                                    } else {
                                        return (
                                            <span key={i}>
                                                <button onClick={(evt) => {
                                                    evt.preventDefault();
                                                    if (boardState.over) {
                                                        return;
                                                    }
                                                    const data = new FormData();
                                                    data.set('player', boardState.turn === null ? '' : boardState.turn);
                                                    data.set('row', String(Math.floor(i/3)));
                                                    data.set('column', String(Math.floor(i%3)));
                                                    // Todo: I could probably set board state sooner.
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
                    <button type="button" onClick={() => router.push(`/game/play?t=${Date.now()}`)}>
                        New Game
                    </button>
                </>
            ) }
            { boardState && boardState.over === null && (
                <h1>It is now {boardState.turn} turn.</h1>
            ) }
            { boardState?.error && (<p>{boardState.error}</p>) }
            { boardState?.error === '404' && (
                <>
                    <button type="button" onClick={() => router.push(`/game/play?t=${Date.now()}`)}>
                        New Game
                    </button>
                </>
            ) }
            {/* Use debug inputs to write JSON for patches to the game. */}
            {/* { boardState?.error !== 404 && 
                <DebugForm game={game} setBoardState={setBoardState} />
            } */}
        </main>
    );
}