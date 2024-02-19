import express from "express";
import cors from "cors";
import nocache from "nocache";
import compression from "compression";
import {
  CorsHost,
  ServerPort,
  DbName,
  DbPort,
  DbHost,
  RepositoryType,
  DbPass,
} from "./config";
import { apiRouter } from "./api";
import { Logger, loggerInit } from "./logger";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";

loggerInit();

const app = express();
app.use(compression());

if (CorsHost) {
  app.use(cors());
  app.options(CorsHost, cors());
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(nocache());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRouter);

const server = app.listen(ServerPort, () =>
  Logger.writeEvent("Backend is listening on port " + ServerPort)
);

server.on("error", Logger.writeException);

try {
  if (!DbHost || !DbName || !DbPort || !RepositoryType || !DbPass) {
    Logger.writeException(
      new Error("Db connection not valid..."),
      "index.ts/Env_Const_Check"
    );
    server.close(() => {
      Logger.writeEvent("Backend shutdown.");
      return process.exit(0);
    });
  }
} catch (e) {
  Logger.writeException(e as Error, "002-DB", "index.ts/Env_Const_Check");
}
