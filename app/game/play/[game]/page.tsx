import React from "react";
import Link from 'next/link'
import { gameData } from "../../new/route";
import { Board } from "./board";
import { DebugForm } from "./debug_play";

export default async function Page(
    { params }: { params: { game: string } }
) {
    return (
        <Board game={params.game} />
    );
}
