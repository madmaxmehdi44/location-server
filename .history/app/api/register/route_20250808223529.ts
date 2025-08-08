import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json(
                { error: "username/password required" },
                { status: 400 }
            );
        }

        const exists = await prisma.user.findUnique({ where: { username } });
        if (exists) {
            return NextResponse.json(
                { error: "username already exists" },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, passwordHash },
        });

        const token = signToken({ sub: user.id, username: user.username });
        return NextResponse.json({
            token,
            userId: user.id,
            username: user.username,
        });
    } catch (e) {
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}
