
const Registration = require("../models/Registration");
const FitnessClass = require("../models/FitnessClass");
const mongoose = require("mongoose");

// CREATE REGISTRATION
exports.createRegistration = async (req, res) => {
    try {
        const { participantName, email, phone, fitnessClass } = req.body;

        if (!participantName || !email || !phone || !fitnessClass) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required registration details."
            });
        }

        if (!mongoose.isValidObjectId(fitnessClass)) {
            return res.status(400).json({
                success: false,
                message: "Invalid fitness class ID."
            });
        }

        const selectedClass = await FitnessClass.findById(fitnessClass);

        if (!selectedClass) {
            return res.status(404).json({
                success: false,
                message: "Fitness class not found."
            });
        }

        // Check for duplicate registration
        const existingRegistration = await Registration.findOne({
            email: email.toLowerCase().trim(),
            fitnessClass,
            status: "Confirmed"
        });

        if (existingRegistration) {
            return res.status(409).json({
                success: false,
                message: "You are already registered for this class."
            });
        }

        // Check class capacity
        const registeredCount = await Registration.countDocuments({
            fitnessClass,
            status: "Confirmed"
        });

        if (registeredCount >= selectedClass.capacity) {
            return res.status(409).json({
                success: false,
                message: "Sorry! This fitness class is full."
            });
        }

        const registration = await Registration.create({
            participantName,
            email,
            phone,
            fitnessClass
        });

        res.status(201).json({
            success: true,
            message: "Registration completed successfully!",
            data: registration
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL REGISTRATIONS
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("fitnessClass", "title category trainer date time price")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET SINGLE REGISTRATION
exports.getRegistrationById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration ID."
            });
        }

        const registration = await Registration.findById(req.params.id)
            .populate("fitnessClass");

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found."
            });
        }

        res.status(200).json({
            success: true,
            data: registration
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE REGISTRATION
exports.updateRegistration = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration ID."
            });
        }

        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found."
            });
        }

        const {
            participantName,
            email,
            phone,
            fitnessClass,
            status
        } = req.body;

        const newClassId = fitnessClass || registration.fitnessClass;

        if (fitnessClass && !mongoose.isValidObjectId(fitnessClass)) {
            return res.status(400).json({
                success: false,
                message: "Invalid fitness class ID."
            });
        }

        if (status && !["Confirmed", "Cancelled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration status."
            });
        }

        if (newClassId) {
            const selectedClass = await FitnessClass.findById(newClassId);

            if (!selectedClass) {
                return res.status(404).json({
                    success: false,
                    message: "Fitness class not found."
                });
            }

            if (status !== "Cancelled" && (
                registration.status === "Cancelled" ||
                String(newClassId) !== String(registration.fitnessClass)
            )) {
                const registeredCount = await Registration.countDocuments({
                    fitnessClass: newClassId,
                    status: "Confirmed"
                });

                if (registeredCount >= selectedClass.capacity) {
                    return res.status(409).json({
                        success: false,
                        message: "This fitness class is full."
                    });
                }
            }
        }

        const newEmail = email
            ? email.toLowerCase().trim()
            : registration.email;

        if (status !== "Cancelled" && (
            registration.status === "Cancelled" ||
            String(newClassId) !== String(registration.fitnessClass) ||
            newEmail !== registration.email
        )) {
            const duplicate = await Registration.findOne({
                _id: { $ne: registration._id },
                fitnessClass: newClassId,
                email: newEmail,
                status: "Confirmed"
            });

            if (duplicate) {
                return res.status(409).json({
                    success: false,
                    message: "This participant is already registered for this class."
                });
            }
        }

        if (participantName !== undefined) {
            registration.participantName = participantName;
        }

        if (email !== undefined) {
            registration.email = newEmail;
        }

        if (phone !== undefined) {
            registration.phone = phone;
        }

        if (fitnessClass !== undefined) {
            registration.fitnessClass = fitnessClass;
        }

        if (status !== undefined) {
            registration.status = status;
        }

        await registration.save();

        res.status(200).json({
            success: true,
            message: "Registration updated successfully!",
            data: registration
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateRegistrationStatus = async (id, newStatus) => {
  try {
    await axios.put(
      `http://localhost:5000/api/registrations/${id}`,
      { status: newStatus }
    );

    alert(`Registration ${newStatus.toLowerCase()} successfully!`);
    fetchDashboardData();
  } catch (err) {
    alert(
      err.response?.data?.message || "Unable to update registration."
    );
  }
};


// DELETE REGISTRATION
exports.deleteRegistration = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration ID."
            });
        }

        const registration = await Registration.findByIdAndDelete(
            req.params.id
        );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Registration deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
