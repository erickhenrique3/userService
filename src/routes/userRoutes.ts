import Router from "@koa/router";
import jwt from "jsonwebtoken";
import { userService } from "../services/userService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/userSchemas";
import { success, error } from "../utils/response";

const JWT_SECRET = process.env.JWT_SECRET!;
const router = new Router();

router.post("/user/register", validate(registerSchema), async (ctx) => {
  const { name, phone, email, password } = (ctx.request as any).validatedBody;

  try {
    const existing = await userService.findByEmail(email) || await userService.findByPhone(phone);
    if (existing) return error(ctx, "Email or phone already registered", 400);

    const user = await userService.createUser(name, phone, email, password);
    return success(ctx, user, "User created successfully", 201);
  } catch (err: any) {
    return error(ctx, "Failed to register user", 500, err.message);
  }
});

router.post("/user/login", validate(loginSchema), async (ctx) => {
  const { email, password } = (ctx.request as any).validatedBody;

  try {
    const user = await userService.findByEmail(email);
    if (!user) return error(ctx, "Invalid credentials", 401);

    const ok = await userService.verifyPassword(password, user.password);
    if (!ok) return error(ctx, "Invalid credentials", 401);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return success(ctx, { token }, "Login successful");
  } catch (err: any) {
    return error(ctx, "Failed to login", 500, err.message);
  }
});

router.get("/user/me", authMiddleware, async (ctx) => {
  return success(ctx, ctx.state.user, "User fetched successfully");
});

export default router;
