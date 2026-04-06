"use client";

import { useEffect, useState } from "react";

// TODO: break apart this component
export function IngredientsListClient() {
    const [names, setNames] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/ingredients-list");
                const data: unknown = await res.json();
                if (!res.ok) {
                    const msg =
                        data &&
                        typeof data === "object" &&
                        "error" in data &&
                        typeof (data as { error: unknown }).error === "string"
                            ? (data as { error: string }).error
                            : `Request failed (${res.status})`;
                    throw new Error(msg);
                }
                if (
                    !data ||
                    typeof data !== "object" ||
                    !("names" in data) ||
                    !Array.isArray((data as { names: unknown }).names)
                ) {
                    throw new Error("Unexpected response from /api/ingredients-list.");
                }
                const list = (data as { names: unknown[] }).names;
                if (!list.every(x => typeof x === "string")) {
                    throw new Error("Invalid ingredient names in response.");
                }
                if (!cancelled) {
                    setNames(list as string[]);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : "Failed to load ingredients.");
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    if (error) {
        return <p style={{ fontFamily: "Arial, sans-serif" }}>{error}</p>;
    }
    if (names === null) {
        return <p style={{ fontFamily: "Arial, sans-serif" }}>Loading…</p>;
    }
    if (names.length === 0) {
        return <p style={{ fontFamily: "Arial, sans-serif" }}>No ingredients.</p>;
    }
    return (
        <ul style={{ fontFamily: "Arial, sans-serif", paddingLeft: "1.5rem" }}>
            {names.map((name) => (
                // TODO: make key robust to duplicates
                <li key={name}>{name}</li>
            ))}
        </ul>
    );
}
