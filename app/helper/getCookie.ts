export default function getCookie({ request, name }: { request: Request; name: string }) {
  const cookieHeader = request.headers.get("cookie");
  console.log("cookieHeader: ", cookieHeader)
  if (!cookieHeader) return undefined;

  return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
}