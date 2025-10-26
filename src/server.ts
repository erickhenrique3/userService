import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "@koa/router";
import * as swaggerUi from "koa2-swagger-ui";
import userRoutes from "./routes/userRoutes";
import { swaggerDefinition } from "./swagger/docs";
import { config } from "dotenv";

config();

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
  ctx.body = { message: "UserService Koa inicializado 🚀" };
});

app.use(bodyParser());

app.use(
  swaggerUi.koaSwagger({
    routePrefix: "/docs",
    swaggerOptions: { spec: swaggerDefinition },
  })
);

app.use(router.routes()).use(router.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

const port = Number(process.env.PORT) || 3001;

const startServer = () => {
   app.listen(port, () => {
    console.log(`✅ User service running on http://localhost:${port}`);
    console.log(`📄 Swagger docs available on http://localhost:${port}/docs`);
  });
};

startServer();
