const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    schoolName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    studentCount: { type: Number, required: true },
    interest: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
