import { NextResponse } from "next/server";
// import { useSelector } from "react-redux";

export function middleware(req, ev) {
	// const token = useSelector((state) => state.auth.token);
	console.log("middleware :");
	// console.log(req.cookies);

	if (true) {
		return NextResponse.next();
	}
	return Response.redirect("/");
}
