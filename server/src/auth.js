import { verifyToken } from "@clerk/backend";
import { HTTPException } from "hono/http-exception";

export const auth = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verifyToken(token);
    const userId = payload.sub;

    c.set("userId", userId); // Pass to GraphQL resolvers
    await next();
  } catch (e) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
};
