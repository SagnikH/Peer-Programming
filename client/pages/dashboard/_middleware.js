import { NextResponse } from "next/server";

export function middleware(req, ev) {
	console.log("middleware :");

  const cookie = req.cookies["nextAuthCookie"];
  console.log(cookie);

	if (cookie) {
		return NextResponse.next();
	}
	return Response.redirect("/");
}
