const mongoose = require("mongoose")

const JobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    companyName: {
        type: String,
        required: true
    },

    jobTitle: {
        type: String,
        required: true
    },

    contactEmail: String,
    contactNumber: Number,
    postedDate: Date,
    applyStatus: Boolean,
    applieddDate: Date,
    seenAt: String,
    notes: String
})


module.exports = mongoose.model("job", JobSchema)