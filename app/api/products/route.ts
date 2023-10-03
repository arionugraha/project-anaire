import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const products = await prisma.product.findMany();

    if (!products) {
        return NextResponse.json({ message: "There is no product yet in the database." }, { status: 200 });
    }
    return NextResponse.json(products);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    const body = await request.json();
    const validation = postSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error, { status: 400 });
    }

    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
        },
    });

    return NextResponse.json(newProduct, { status: 201 });
}
