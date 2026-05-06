import { redirect } from "react-router";
import refreshTokenKeyCookie from "~/constants/const";
import getCookie from "~/helper/getCookie";

export async function protectedMiddleware({ request }: { request: Request }) {
    const refreshToken = getCookie({ request, name: refreshTokenKeyCookie });
    if (!refreshToken) {
        throw redirect("/login");
    }
}
