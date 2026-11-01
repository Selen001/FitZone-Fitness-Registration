
const mongoose = require("mongoose");

const fitnessClassSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Class title is required"],
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: ["Yoga", "Strength Training", "Cardio", "Zumba", "Pilates", "Cycling"]
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        trainer: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: Number,
            required: true,
            min: 1
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        date: {
            type: Date,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        image: {
            type: String,
            default: ""
        },

        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("FitnessClass", fitnessClassSchema);
