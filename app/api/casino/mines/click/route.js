import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const { gameSession, index} = await req.json();
        
        const response = await prisma.gameSession.findFirst({
            where: {
              mineGame: {
                id: gameSession, 
              },
            },
            include: {
              mineGame: true, 
            },
          });
          console.log(response.mineGame)
        const {mines,bomb,ppc,clickedMine} = response.mineGame
        console.log(bomb)
        
        
        
        

        if(mines[index]==1){
            await prisma.gameSession.update({
                where:{
                    id:response.id
                },
                data:{
                    result:"loss",
                    profit:0,
                    endedAt:new Date()
                }
            })
            return NextResponse.json({status:400,message:"bomb detected"})
        }

        // if(!response){
        //     throw new Error('Game session not found')
        // }
        let clicked = clickedMine.filter(value => value === true).length;
        const profitPercent = response.profit+ppc/(25-bomb-clicked);
        clickedMine[index] = true

        await prisma.gameSession.update({
            where:{
                id:response.id
            },
            data:{
                profit:profitPercent
            }
        })
        // console.log("Hello")
        // console.log(response.mineGame?.id)
        await prisma.mineGame.update({
            where:{
                id:response.mineGame?.id
            },
            data:{
                clickedMine:clickedMine,
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

        return NextResponse.json({ status: 200, updatedClickedMine: clickedMine ,profit:profitPercent});
    } catch (error) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}

