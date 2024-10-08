"use server"

import { schemaSignIn } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation"
import prisma from "../../../../../../../lib/prisma";
import bcrypt from 'bcrypt'
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";


export async function SignIn(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {


    const validate = schemaSignIn.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if( !validate.success ){


        return {
            error: validate.error.errors[0].message
        }
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: validate.data.email,
            role: 'superadmin'
        }
    })

    if (!existingUser) {
        return {
            error: 'Email not found'
        }
    }

    const comparePassword = bcrypt.compareSync(validate.data.password, existingUser.password)
    
    if (!comparePassword) {
        return {
            error: 'Email/Password incorrect'
        }
    }
    const userId:any = existingUser.id;
    console.log(userId)
    const session = await lucia.createSession(userId, {})


    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/dashboard')
}