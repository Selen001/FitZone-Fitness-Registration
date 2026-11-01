
const express = require("express");
const router = express.Router();

const {
    createRegistration,
    getAllRegistrations,
    getRegistrationById,
    updateRegistration,
    deleteRegistration
} = require("../controllers/registrationController");

// Create registration
router.post("/", createRegistration);

// Get all registrations
router.get("/", getAllRegistrations);

// Get individual registration
router.get("/:id", getRegistrationById);

// Update registration
router.put("/:id", updateRegistration);

// Delete registration
router.delete("/:id", deleteRegistration);

module.exports = router;
