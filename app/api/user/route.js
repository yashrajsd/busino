import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req){
    const { username, password, name, email, phone } = await req.json(); 

    const findUser = await prisma.user.findUnique({
        where:{
            username:username
        }
    })

    if(findUser){
        return NextResponse.json({status:400})
    }

    const newUser = await prisma.user.create({
        data:{
            name:name,
            username:username,
            phone:phone,
            password:password,
            email:email
        }
    })

    return NextResponse.json({
        status:200,
        message:"New user Created"
    })

}

