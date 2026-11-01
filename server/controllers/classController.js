
const FitnessClass = require("../models/FitnessClass");
const Registration = require("../models/Registration");
const mongoose = require("mongoose");

// CREATE FITNESS CLASS
exports.createClass = async (req, res) => {
    try {
        const newClass = await FitnessClass.create(req.body);

        res.status(201).json({
            success: true,
            message: "Fitness class created successfully!",
            data: newClass
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL FITNESS CLASSES
exports.getAllClasses = async (req, res) => {
    try {
        const { category, level, search } = req.query;

        let filter = {};

        if (category) filter.category = category;
        if (level) filter.level = level;

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        const classes = await FitnessClass.find(filter)
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: classes.length,
            data: classes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET SINGLE FITNESS CLASS
exports.getClassById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid class ID"
            });
        }

        const fitnessClass = await FitnessClass.findById(req.params.id);

        if (!fitnessClass) {
            return res.status(404).json({
                success: false,
                message: "Fitness class not found"
            });
        }

        res.status(200).json({
            success: true,
            data: fitnessClass
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE FITNESS CLASS
exports.updateClass = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid class ID"
            });
        }

        const updatedClass = await FitnessClass.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedClass) {
            return res.status(404).json({
                success: false,
                message: "Fitness class not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Fitness class updated successfully!",
            data: updatedClass
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE FITNESS CLASS
exports.deleteClass = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid class ID"
            });
        }

        const fitnessClass = await FitnessClass.findById(req.params.id);

        if (!fitnessClass) {
            return res.status(404).json({
                success: false,
                message: "Fitness class not found"
            });
        }

        const registrations = await Registration.countDocuments({
            fitnessClass: req.params.id,
            status: "Confirmed"
        });

        if (registrations > 0) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete this class because participants are registered. Cancel their registrations first."
            });
        }

        await fitnessClass.deleteOne();

        res.status(200).json({
            success: true,
            message: "Fitness class deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
