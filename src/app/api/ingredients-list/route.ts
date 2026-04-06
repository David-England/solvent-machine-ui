import { queryIngredientsList } from "@/lib/ingredients-list-query";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const names = await queryIngredientsList();
        return NextResponse.json({ names });
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
