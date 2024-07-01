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

        return NextResponse.json({ status: 200, updatedClickedMine: clickedMine ,profit:profitPercent.toFixed(2)});
    } catch (error) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}

