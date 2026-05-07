function getCookieClient(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const cookieHeader = document.cookie;
  if (!cookieHeader) return undefined;

  return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
}

export default function getCookie({
  request,
  name,
}: {
  request?: Request;
  name: string;
}): string | undefined {
  if (request) {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return undefined;

    const cookie = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`));

      // console.log(cookieHeader)
    if (!cookie) return undefined;

    // Берём всё после первого "=" — важно для JWT/base64 
    return cookie.substring(name.length + 1);
  }
}