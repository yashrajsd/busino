import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const bombs = parseInt(searchParams.get('bombs'), 10);

        if (isNaN(bombs) || bombs <= 0 || bombs > 25) {
            return NextResponse.json({ error: 'Number of bombs must be between 0 and 25' }, { status: 400 });
        }

        const array = Array(bombs).fill(0).concat(Array(25 - bombs).fill(1));
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return NextResponse.json({ array }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
