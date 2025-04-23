import { WorkspaceItem } from "@/types/workspace";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<WorkspaceItem> }
) {
  const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify({ id, name: `User ${id}` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  // e.g. Delete user with ID `id` in DB
  return new Response(id, { status: 204 });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
