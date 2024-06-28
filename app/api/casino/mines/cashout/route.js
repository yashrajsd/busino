import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req){
    try{
        const { gameSession, userId } = await req.json();
        
        // const existingSession = await prisma.gameSession.findFirst({
        //     where: {
        //         userId: userId,
        //         gameId: gameSession
        //     }
        // });

        // if (!existingSession) {
        //     console.log("hahahaha")
        //     return NextResponse.json({ status: 404, message: "Session not found" });
        // }

        const updatedSession = await prisma.gameSession.update({
            where: {
                userId: userId,
                gameId: gameSession
            },
            data: {
                endedAt: new Date()
            }
        });
        
        if (!updatedSession) {
            return NextResponse.json({ status: 500, message: "Failed to update session" });
        }

        return NextResponse.json({ status: 200, message: "Cashout successful" });

    } catch(error) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}
