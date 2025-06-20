import Cookies from "universal-cookie";
import { isDev } from "./util";

type cookieKey = "access_token" | "refresh_token";
const domain = ".baohaiquanvietnam.vn";

export async function get(key: cookieKey, dft = ""): Promise<string> {
  try {
    if (typeof window === "undefined") {
      const cookies = require("next/headers").cookies;
      const cookieStore = await cookies();
      const { value } = cookieStore.get(key) ?? { value: dft };
      return value;
    } else {
      const cookies = new Cookies();
      return cookies.get(key) ?? dft;
    }
  } catch (e) {}
  return dft;
}

export function set(key: string, value: any) {
  try {
    if (typeof window !== "undefined") {
      let opts: any = { path: "/", sameSite: true };
      if (!isDev()) {
        const expires = new Date(Date.now() + 604800000); // 7 days in milliseconds};
        opts = { ...opts, expires, domain, sameSite: "strict" };
      }

      const cookies = new Cookies();
      return cookies.set(key, value, opts);
    }
  } catch (e) {
    console.log("libs cookie set() failure: ", e);
  }

  return false;
}

export function remove(key: string) {
  try {
    if (typeof window !== "undefined") {
      let opts: any = { path: "/" };
      if (!isDev()) opts = { ...opts, domain, sameSite: "strict" };

      const cookies = new Cookies();
      return cookies.remove(key, opts);
    }
  } catch (e) {
    console.log(e);
  }
}
