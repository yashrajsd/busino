import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { game } = await req.json();

        const findGame = await prisma.game.findUnique({
            where: {
                name: game
            }
        });

        if (findGame) {
            return NextResponse.json({ status: 400, message: 'Game already exists' });
        }
        
        const newGame = await prisma.game.create({
            data: {
                name: game
            }
        });

        return NextResponse.json({ status: 200, message: 'Game added' });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
