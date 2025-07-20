import { createClerkClient } from "@clerk/backend";
import { HTTPException } from "hono/http-exception";
import { config } from "./configs/app.js";

export const auth = async (c, next) => {
  const clerkClient = createClerkClient({
    secretKey: config.CLERK_SECRET_KEY,
    publishableKey: config.CLERK_PUBLISHABLE_KEY,
  });

  const req = c.req.raw;

  try {
    const { isAuthenticated, userId } = (
      await clerkClient.authenticateRequest(req)
    ).toAuth();

    if (!isAuthenticated) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    c.userId = userId;

    await next();
  } catch (e) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
};
