
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
    {
        participantName: {
            type: String,
            required: [true, "Participant name is required"],
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },

        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Enter a valid 10-digit phone number"]
        },

        fitnessClass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FitnessClass",
            required: true
        },

        status: {
            type: String,
            enum: ["Confirmed", "Cancelled"],
            default: "Confirmed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Registration", registrationSchema);
