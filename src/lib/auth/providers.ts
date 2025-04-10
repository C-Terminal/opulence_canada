// src/lib/auth/providers.ts
import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

export interface AuthProvider {
  id: string;
  name: string;
  type: string;
  iconUrl: string;
}

// Create a store to hold the providers
export const authProviders: Writable<AuthProvider[]> = writable([]);

// Function to load providers from the API endpoint
export async function loadProviders(): Promise<void> {
  if (!browser) return;
  
  try {
    const response = await fetch("/api/auth/providers");
    const data = await response.json();
    authProviders.set(data.providers);
  } catch (error) {
    console.error("Failed to load auth providers:", error);
    authProviders.set([]);
  }
}
