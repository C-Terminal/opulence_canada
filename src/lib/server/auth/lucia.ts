// lib/server/auth.ts
import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db';
import { sessionTable, userTable} from '$lib/server/db/schema';


export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    name: 'auth_session',
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    }
  },
  getUserAttributes: (data) => {
    return {
      username: data.username
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: {
      username: string;
    };
  }
}

