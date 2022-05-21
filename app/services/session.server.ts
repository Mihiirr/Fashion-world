import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { db } from "./client.server";

type LoginForm = {
  username: string;
  password: string;
};

export async function register(username: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { username, password: passwordHash },
  });
  return { id: user.id, username };
}

export async function login({ username, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { username },
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) return null;

  return { id: user.id, username };
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/account/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "Fw_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = await session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        role: true,
        Order: true,
      },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function createUserSession(userId: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function totalUserCount() {
  return db.user.count();
}
