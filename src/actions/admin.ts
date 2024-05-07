"use server"

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";


export default async function admin() {
    const role = await currentRole();


    if(role === UserRole.ADMIN) {
        return { success: "autorizado" };
    }

    return { error: "não autorizado"}

    
}