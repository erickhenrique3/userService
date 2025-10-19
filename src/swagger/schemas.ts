export const RegisterUserSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "João Silva" },
    phone: { type: "string", example: "11999999999" },
    email: { type: "string", format: "email", example: "joao@email.com" },
    password: { type: "string", minLength: 6, example: "123456" },
  },
  required: ["name", "phone", "email", "password"],
};

export const LoginUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
};
