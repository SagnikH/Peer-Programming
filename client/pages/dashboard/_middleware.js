import { NextRequest, NextResponse } from 'next/server'

export function middleware(req, ev) {
    if(false){
        return Response.redirect("/");
    }
  return NextResponse.next();
}