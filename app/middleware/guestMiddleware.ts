import type { Context } from "react";
import { redirect } from "react-router";
import refreshTokenKeyCookie from "~/constants/const";
import getCookie from "~/helper/getCookie";
// import type { Route } from "./+types/guestMiddleware";



export async function guestMiddleware({ request }: {request: any}) {

    /// TODO: Old name
    const refreshToken = getCookie({request: request, name: refreshTokenKeyCookie});
    console.log("refreshToken: ", refreshToken)
    if (refreshToken) {
        throw redirect("/")
    }
}
