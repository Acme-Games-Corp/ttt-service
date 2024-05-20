'use client'
import { Dispatch } from "react";
export function DebugForm ({ game, setBoardState }: { game: string, setBoardState: Dispatch<any> }) {
    return (<>
        <form onSubmit={(evt) => {
            evt.preventDefault();
            const data = new FormData(evt.target as HTMLFormElement);        
            fetch(`/game/${game}`, {
              method: 'PATCH',
              body: data,
            }).then((response) => {
                response.json().then((data) => {
                    setBoardState(data);
                    (evt.target as HTMLFormElement).reset();
                });
            });
        }}>
            <p><label>Player:</label> <input name="player" /></p>
            <p><label>Row:</label> <input name="row" /></p>
            <p><label>Column:</label> <input name="column" /></p>
            <p><input type="submit" /></p>
        </form>
    </>);
}
