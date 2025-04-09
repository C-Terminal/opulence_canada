import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { transactions } from '$lib/server/db/schema';
import { asc, desc } from 'drizzle-orm';

export async function GET() {
    try {
        const data = await db.select().from(transactions).orderBy(desc(transactions.date));
        return json(data);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}