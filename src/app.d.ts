import { PgDatabase } from 'drizzle-orm/pg-core';
import * as schema from '$lib/db/schema';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
			db: PostgresJsDatabase<typeof schema>
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

// src/app.d.ts
/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			username: string;
			email: string;
		};
		type DatabaseSessionAttributes = {};
	}
}

// THIS IS IMPORTANT!!!
export { };
