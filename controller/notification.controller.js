import Fcm from "../models/fcm.model.js";
import admin from "firebase-admin";

const notificationController = async (req, res) => {
    try {
        const { title, description } = req.body;
        const fcms = await Fcm.find({}).select("fcmToken -_id");
    
        // let dtoken = [];
    
        // fcms.forEach((t) => {
        //     dtoken.push(t.fcmToken);
        // });

        if (fcms.length) {
            // Send notification to multiple devices
            const messages = fcms.map((deviceToken) => ({
                notification: {
                    title,
                    body: description,
                },
                token: deviceToken.fcmToken,
            }));
            await admin.messaging().sendEach(messages);
            res.status(200).json({ success: true });
        }


    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const createToken = async (req, res) => {
    const { token } = req.body;
    try {
        const exist = await Fcm.find({ fcmToken: token });

        if (!exist.length) {
            const fcms = new Fcm({
                fcmToken: token,
            });

            await fcms.save();

            return res.status(200).json({ message: "token generated" });
        }
    } catch (error) {
        res.status(500).json({ message: "token generated faild" });
    }
};

export { notificationController,createToken }; 