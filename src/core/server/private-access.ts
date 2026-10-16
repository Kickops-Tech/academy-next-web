import { NextRequest, NextResponse } from "next/server";

const PRIVATE_ACCESS_COOKIE = "kickops_private_access";
const PRIVATE_ACCESS_REALM = "Kickops Academy";
const PRIVATE_ACCESS_SESSION_PAYLOAD = "kickops-private-access:v1";
const PRIVATE_ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type PrivateAccessConfig = {
  username: string;
  password: string;
  secret: string;
};

function getPrivateAccessConfig(): PrivateAccessConfig | undefined {
  const password = process.env.PRIVATE_ACCESS_PASSWORD;
  const secret = process.env.PRIVATE_ACCESS_SECRET;

  if (!password || !secret) {
    return undefined;
  }

  return {
    username: process.env.PRIVATE_ACCESS_USERNAME || "kickops",
    password,
    secret,
  };
}

function constantTimeEqual(value: string, expected: string): boolean {
  const comparedLength = Math.max(value.length, expected.length);
  let difference = value.length ^ expected.length;

  for (let index = 0; index < comparedLength; index += 1) {
    difference |=
      (value.charCodeAt(index) || 0) ^ (expected.charCodeAt(index) || 0);
  }

  return difference === 0;
}

function parseBasicCredentials(
  authorization: string | null,
): { username: string; password: string } | undefined {
  if (!authorization?.startsWith("Basic ")) {
    return undefined;
  }

  try {
    const encodedCredentials = authorization.slice("Basic ".length).trim();
    const credentialBytes = Uint8Array.from(
      atob(encodedCredentials),
      (character) => character.charCodeAt(0),
    );
    const decodedCredentials = new TextDecoder().decode(credentialBytes);
    const separatorIndex = decodedCredentials.indexOf(":");

    if (separatorIndex < 0) {
      return undefined;
    }

    return {
      username: decodedCredentials.slice(0, separatorIndex),
      password: decodedCredentials.slice(separatorIndex + 1),
    };
  } catch {
    return undefined;
  }
}

async function createSessionToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(PRIVATE_ACCESS_SESSION_PAYLOAD),
  );

  return Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function restrictedResponse(): NextResponse {
  return new NextResponse("Acesso restrito.", {
    status: 401,
    headers: {
      "Cache-Control": "private, no-store",
      "WWW-Authenticate": `Basic realm="${PRIVATE_ACCESS_REALM}", charset="UTF-8"`,
    },
  });
}

function unavailableResponse(): NextResponse {
  return new NextResponse("Acesso temporariamente indisponível.", {
    status: 503,
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}

export async function authorizePrivateAccess(
  request: NextRequest,
): Promise<NextResponse> {
  const config = getPrivateAccessConfig();

  if (!config) {
    return unavailableResponse();
  }

  const sessionToken = await createSessionToken(config.secret);
  const cookieToken = request.cookies.get(PRIVATE_ACCESS_COOKIE)?.value;

  if (cookieToken && constantTimeEqual(cookieToken, sessionToken)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  const credentials = parseBasicCredentials(
    request.headers.get("authorization"),
  );
  const credentialsAreValid =
    credentials !== undefined &&
    constantTimeEqual(credentials.username, config.username) &&
    constantTimeEqual(credentials.password, config.password);

  if (!credentialsAreValid) {
    return restrictedResponse();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.cookies.set({
    name: PRIVATE_ACCESS_COOKIE,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: PRIVATE_ACCESS_MAX_AGE_SECONDS,
    path: "/",
  });

  return response;
}
