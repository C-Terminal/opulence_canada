import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { wallets } from '$lib/server/db/schema';

export async function GET() {
    try {
        const data = await db.select().from(wallets);
        return json(data);
    } catch (error) {
        console.error('Error fetching wallets:', error);
        return json({ error: 'Failed to fetch wallets' }, { status: 500 });
    }
}