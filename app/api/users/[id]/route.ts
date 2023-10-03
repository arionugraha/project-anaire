import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { putSchema } from "../schema";

interface Props {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props): Promise<NextResponse> {
    const user = await prisma.user.findUnique({
        where: { id: params.id },
    });

    return !user ? NextResponse.json({ message: "User not found" }, { status: 200 }) : NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: Props): Promise<NextResponse> {
    const body = await request.json();
    const validation = putSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { id: params.id },
    });

    if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
        where: { id: params.id },
        data: { name: body.name },
    });

    return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
    const existingUser = await prisma.user.findUnique({
        where: { id: params.id },
    });

    if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ message: "User deleted successfully." }, { status: 204 });
}
