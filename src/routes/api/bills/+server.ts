import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { bills } from '$lib/server/db/schema';
import { asc, desc } from 'drizzle-orm';

export async function GET() {
    try {
        const data = await db.select().from(bills).orderBy(asc(bills.dueDate));
        return json(data);
    } catch (error) {
        console.error('Error fetching bills:', error);
        return json({ error: 'Failed to fetch bills' }, { status: 500 });
    }
}