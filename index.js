const connectMongoose = require("./config/mongoose");
const express = require("express");
const routerV2 = require("./app/router_v2/router");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2", routerV2);

app.use((req, res) => res.status(404).json("End point not found!"));

app.listen(5000, async () => {
  try {
    const x = await connectMongoose();
    // console.log(x);
    console.log("Server is listening on port 5000");
  } catch (error) {
    console.log(error);
    console.log("Server Something went wrong");
  }
});
