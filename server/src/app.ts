import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

mongoose
    .connect(process.env.DB_URI!)
    .then((result) => {
        console.log("db connected");
        app.listen(4000, "0.0.0.0");
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("now listenening for requests on port 4000");
});
