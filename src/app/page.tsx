import { IngredientsListClient } from "./ingredients-list-client";

export default function Home() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <header
                style={{
                    backgroundColor: "#1a56db",
                    color: "#fff",
                    padding: "12px 16px",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                }}
            >
                solvent-machine
            </header>
            <main style={{ padding: "16px" }}>
                <IngredientsListClient />
            </main>
        </div>
    );
}
