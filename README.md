# solvent-machine-ui

Small Next.js app that shows a **solvent-machine** header and a bullet list of ingredient names.

The home page loads names in a **client component** via `fetch` inside `useEffect`, calling the same-origin route **`/api/ingredients-list`**. That API route runs on the server and uses **`queryIngredientsList`** in `src/lib/ingredients-list-query.ts` (marked with `server-only`) to call the real backend **`GET /ingredients-list`**, so the browser never talks to the external API directly (no CORS issues).

Set the backend base URL in **`WEB_SERVICE_ROOT_URL`** (for example in `.env.local`). The app expects the service to return JSON as either a string array or `{ "names": string[] }`.
