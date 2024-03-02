import { NextResponse } from 'next/server';
export async function GET(request: Request, { params }) {
    const id = params.slug
    return NextResponse.json(id);
}