'use client'
import { Dispatch } from "react";
export function DebugForm ({ game, setBoardState }: { game: string, setBoardState: Dispatch<any> }) {
    return (<>
        <h1>Hello World</h1>
        <form onSubmit={(evt) => {
            evt.preventDefault();
            console.log(evt);
            const data = new FormData(evt.target as HTMLFormElement);

            console.log(data.get('email')); // Reference by form input's `name` tag
        
            fetch(`/game/${game}`, {
              method: 'PATCH',
              body: data,
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    setBoardState(data);
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
