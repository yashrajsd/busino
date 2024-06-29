import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { bombs, userId, betAmount } = await req.json();
        console.log({bombs,userId,betAmount})

        const array = Array(bombs).fill(1).concat(Array(25 - bombs).fill(0));
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        const gameSession = await prisma.gameSession.create({
            data: {
                userId: 1,
                gameId: 1,
                betAmount: betAmount,
                status: 'ongoing',
                result: ''
            }
        });

        const mineGame = await prisma.mineGame.create({
            data: {
                userId: userId,
                mines: array,
                clickedMine: new Array(25).fill(false),
                startedAt: new Date(),
                gameId: gameSession.id,
                bomb: bombs 
            }
        });

        const active = true;

        return NextResponse.json({ status: 200, active,message:'Mine created successfully'});
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = parseInt(searchParams.get('userId'));
        const gameId = parseInt(searchParams.get('gameId'));

        if (!userId || !gameId) {
            return NextResponse.json({ status: 400, error: 'Missing userId or gameId' });
        }
        console.log({userId,gameId})
        const activeSession = await prisma.gameSession.findFirst({
            where: {
                userId: userId,
                endedAt: null,
                gameId: gameId
            },
            include: {
                mineGame: true
            }
        });

        console.log(activeSession.id)

        if (!activeSession) {
            return NextResponse.json({ status: 404, active: false });
        }

        const clickedMine = activeSession.mineGame?.clickedMine || [];
        console.log(activeSession.mineGame.id)
        return NextResponse.json({ 
            status: 200, 
            active: true,
            id: activeSession.mineGame?.id,
            clickedMine: clickedMine 
        });
    } catch (error) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}