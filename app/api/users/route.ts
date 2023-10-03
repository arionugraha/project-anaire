import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest): Promise<NextResponse> {
   const users = await prisma.user.findMany();

   if (!users) {
      return NextResponse.json({ message: "There is no user yet in the database." }, { status: 200 });
   }
   return NextResponse.json(users);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
   const body = await request.json();
   const validation = postSchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error, { status: 400 });
   }

   const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
   });

   if (existingUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
   }

   const newUser = await prisma.user.create({
      data: {
         name: body.name,
         email: body.email,
         password: body.password,
      },
   });

   return NextResponse.json(newUser, { status: 201 });
}
