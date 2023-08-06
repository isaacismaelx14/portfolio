import { NextResponse } from 'next/server';
import Me from '../../../data/me.json';

export async function GET() {
    return NextResponse.json(Me.projects);
}
