import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const { gameSession, userId } = await req.json();
        console.log('gameSession')
        const existingSession = await prisma.gameSession.findFirst({
            where: {
                userId: userId,
                endedAt:null
            }
        });

        // if (!existingSession) {
        //     return NextResponse.json({ status: 404, message: "Session not found" });
        // }

        const updatedSession = await prisma.gameSession.update({
            where: {
                id: existingSession.id
            },
            data: {
                endedAt: new Date()
            }
        });
        
        return NextResponse.json({ status: 200, message: "Cashout successful", data: updatedSession });

    } catch(error) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}
