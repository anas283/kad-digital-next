import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get('token')?.value
  const url = req.url;

  if(url.includes('/login')) {
    if(token) {
      return NextResponse.redirect(new URL("/dashboard/overview", req.url));
    }
    else {
      return NextResponse.next();
    }
  }

  if(url.includes('/dashboard')) {
    if(token === undefined) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if(token) {
      return NextResponse.next();
    }
    else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}