import { NextResponse } from "next/server";
// import { useSelector } from "react-redux";

export function middleware(req, ev) {
	// const token = useSelector((state) => state.auth.token);

	if (true) {
		return NextResponse.next();
	}
	return Response.redirect("/");
}
