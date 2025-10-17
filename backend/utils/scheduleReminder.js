import cron from "node-cron";
import Medication from "../models/Medication.js";
import User from "../models/User.js";
import sendEmail from "./sendEmail.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:mm format

  const meds = await Medication.find({ times: currentTime }).populate("user");
  meds.forEach(async (med) => {
    const user = med.user;
    if (user.notificationPreference === "email") {
      await sendEmail(user.email, `Time to take your medication: ${med.name}`, `Don't forget to take ${med.name} at ${currentTime}`);
    }
    // For browser notifications, you might need to integrate with frontend or use push notifications
  });
});
