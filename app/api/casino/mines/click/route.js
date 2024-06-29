import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const { gameSession, index} = await req.json();

        const response = await prisma.mineGame.findUnique({
            where:{
                id:gameSession
            }
        })

        
        if(!response){
            throw new Error('Game session not found')
        }

        const {clickedMine} = response

        clickedMine[index] = true

        await prisma.mineGame.update({
            where:{
                id:gameSession
            },
            data:{
                clickedMine:clickedMine
            }
        })

        // Validate input
        // if (typeof userId !== 'number' || typeof gameId !== 'number' || typeof index !== 'number' || typeof newValue !== 'boolean') {
        //     return NextResponse.json({ status: 400, error: 'Invalid input' });
        // }

        // const result = await prisma.$transaction(async (tx) => {
        //     // const session = await tx.mineGame.findUnique({
        //     //     where: {
        //     //         gameId: gameSession,
        //     //     },
        //     // });

        //     // if (!session) {
        //     //     throw new Error('Game session not found');
        //     // }

        //     // const { clickedMine } = session;

        //     // clickedMine[index] = newValue;

        //     // await tx.mineGame.update({
        //     //     where: {
        //     //         gameId: gameSession,
        //     //     },
        //     //     data: {
        //     //         clickedMine: clickedMine,
        //     //     },
        //     // });

        //     return clickedMine;
        // });

        return NextResponse.json({ status: 200, updatedClickedMine: clickedMine });
    } catch (error) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}

