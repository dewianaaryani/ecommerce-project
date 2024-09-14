"use server"

import { getUser, lucia } from "@/lib/auth";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout(
){
    console.log('logout');

    const {session} = await getUser()

    if(!session) {
        return {
            error : 'Unathorized'
        }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/sign-in')
}