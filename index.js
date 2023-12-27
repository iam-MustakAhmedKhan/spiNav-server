import admin from "firebase-admin";
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import notificationRouter from './routes/notification.route.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
        projectId: process.env.PROJECT_ID,
    }),
    projectId: process.env.PROJECT_ID,
});


app.use(notificationRouter);

mongoose.connect(process.env.MONGO_DB).then(() => {
    app.listen(3000, function () {
        console.log("Server started on port 3000");
    });
});
