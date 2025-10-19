import { cookies as getCookies } from "next/headers";
interface Props {
  prefix: string;
  value: string;
}
export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};
