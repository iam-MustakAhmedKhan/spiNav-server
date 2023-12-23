import { Schema, model } from "mongoose";

const fcm = new Schema({
    fcmToken: {
        type: "string",
    }
}, {
    timestamps: true,
});

const Fcm = model('Fcm', fcm);

export default Fcm