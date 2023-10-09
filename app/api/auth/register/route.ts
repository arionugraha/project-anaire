import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
   email: z.string().email(),
   password: z.string().min(8),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
   const body = await request.json();
   const validation = schema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
   }

   const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
   });

   if (existingUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
   }

   const newUser = await prisma.user.create({
      data: {
         email: body.email,
         password: await bcrypt.hash(body.password, 8),
      },
   });

   return NextResponse.json({ email: newUser.email }, { status: 201 });
}
