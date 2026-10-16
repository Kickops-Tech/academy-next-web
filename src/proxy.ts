import { authorizePrivateAccess } from "@core/server/private-access";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return authorizePrivateAccess(request);
}

export const config = {
  matcher: ["/treinamentos/:path*", "/sebrae/:path*"],
};
