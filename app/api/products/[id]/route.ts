import { NextRequest, NextResponse } from "next/server";
import { putSchema } from "../schema";
import prisma from "@/prisma/client";

interface Props {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props): Promise<NextResponse> {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    return !product ? NextResponse.json({ message: "Product not found" }, { status: 200 }) : NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Props): Promise<NextResponse> {
    const body = await request.json();
    const validation = putSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!existingProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
        where: { id: params.id },
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
        },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
    const existingProduct = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!existingProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });
}
