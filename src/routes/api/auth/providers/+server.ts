// src/routes/api/auth/providers/+server.ts
import { json } from "@sveltejs/kit";
import { availableProviderIds } from "$lib/server/auth";
import type { RequestHandler } from "./$types";

// Endpoint to safely fetch provider information on the client
export const GET: RequestHandler = async () => {
  // Map provider IDs to objects with display information
  const providers = availableProviderIds.map(id => {
    // You can add custom metadata like display names and icons here
    const displayName = id === "credentials" ? "Email & Password" : id.charAt(0).toUpperCase() + id.slice(1);
    return {
      id,
      name: displayName,
      type: id === "credentials" ? "credentials" : "oauth",
      // Add any other client-safe metadata
      iconUrl: id === "credentials" ? `/images/auth/email.svg` : `/images/auth/${id}.svg`
    };
  });
  
  return json({ providers });
};