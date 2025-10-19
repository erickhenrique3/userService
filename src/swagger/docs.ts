import { RegisterUserSchema, LoginUserSchema } from "./schemas";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: { title: "User API", version: "1.0.0" },
  components: {
    schemas: {
      RegisterUser: RegisterUserSchema,
      LoginUser: LoginUserSchema,
    },
  },
  paths: {
    "/user/register": {
      post: {
        summary: "Register a new user",
        tags: ["Users"],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterUser" } } } },
        responses: {
          201: { description: "User created successfully" },
          400: { description: "Email already registered" },
        },
      },
    },
    "/user/login": {
      post: {
        summary: "Login user",
        tags: ["Users"],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/LoginUser" } } } },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
        },
      },
    },
  },
};
