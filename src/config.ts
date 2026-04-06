/**
 * Web service base URL (no trailing slash required).
 * Set `WEB_SERVICE_ROOT_URL` in the environment (e.g. `.env.local`).
 */
export function getWebServiceRootUrl(): string {
    const raw = process.env.WEB_SERVICE_ROOT_URL;
    if (!raw?.trim()) {
        throw new Error(
            "WEB_SERVICE_ROOT_URL is not set. Add it to your environment (e.g. .env.local).",
        );
    }
    return raw.replace(/\/+$/, "");
}
