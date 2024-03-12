const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

mongoose
    .connect(process.env.DB_URI)
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
