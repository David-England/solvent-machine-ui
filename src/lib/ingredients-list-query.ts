import "server-only";

import { getWebServiceRootUrl } from "@/config";

function parseIngredientNames(payload: unknown): string[] {
    if (Array.isArray(payload) && payload.every(x => typeof x === "string")) {
        return payload;
    }
    if (
        payload &&
        typeof payload === "object" &&
        "names" in payload &&
        Array.isArray((payload as { names: unknown }).names)
    ) {
        const names = (payload as { names: unknown[] }).names;
        if (names.every((x) => typeof x === "string")) {
            return names as string[];
        }
    }
    throw new Error("Unexpected /ingredients-list response shape.");
}

/**
 * Fetches ingredient name strings from the backend (server-side only; avoids browser CORS).
 */
export async function queryIngredientsList(): Promise<string[]> {
    const base = getWebServiceRootUrl();
    const url = `${base}/ingredients-list`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Ingredients request failed: ${res.status} ${res.statusText}`);
    }
    const data: unknown = await res.json();
    return parseIngredientNames(data);
}
