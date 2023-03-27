import { NextResponse } from "next/server";
// eslint-disable-next-line import/no-extraneous-dependencies
import absoluteUrl from "next-absolute-url";

// This middleware checks the cookie for an access token. If there is no token, redirect to another page.

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  // Check for token.
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("ACCESS_TOKEN")?.value;

    const url = req.nextUrl.clone();
    url.pathname = "/signin";

    // If there is no token in the cookie redirect to sign in page
    if (!token) {
      return NextResponse.redirect(url);
    }
  }
}
