import { NextRequest } from "next/server";

type Handler = (req: NextRequest, context?: never) => Promise<Response>;

export function middleware(handler: Handler): Handler {
  return async (req, context) => {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If authenticated, call the original handler
    return handler(req, context);
  };
}
