'use server'
import { redirect } from 'next/navigation'
import { initiateGame } from '../new/route';

export default async function Page() {

    const game = await initiateGame('none');

    redirect(`/game/play/${game}`);

}