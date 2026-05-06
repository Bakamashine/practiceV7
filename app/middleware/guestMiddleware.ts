import { redirect } from "react-router";
import { accessTokenKeyCookie } from "~/constants/const";
import getCookie from "~/helper/getCookie";

export async function guestMiddleware({ request }: { request: Request }) {
    const accessToken = getCookie({ request, name: accessTokenKeyCookie });
    if (accessToken) {
        throw redirect("/");
    }
}
