import express from "express";
import { ApiResponse } from "./utils/ApiResponse.js";
import { indexRouter } from "./routes/index.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use("*", (req, res) => {
  res
    .status(404)
    .send(
      new ApiResponse(
        404,
        null,
        "The route you are trying to access does not exist."
      )
    );
});

export { app };
