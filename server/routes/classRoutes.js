
const express = require("express");
const router = express.Router();

const {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass
} = require("../controllers/classController");

// Create class
router.post("/", createClass);

// Get all classes
router.get("/", getAllClasses);

// Get single class
router.get("/:id", getClassById);

// Update class
router.put("/:id", updateClass);

// Delete class
router.delete("/:id", deleteClass);

module.exports = router;
