const express = require("express")
const router = express.Router()
const Job = require("../models/Job")
const auth = require("../middleware/auth")


// @route   GET api/jobs
// @desc    Get all saved job applications
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id }).sort({ date: -1 })
        res.json(jobs)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})

// @route   POST api/jobs
// @desc    Add new job
// @access  Private
router.post("/", auth, async (req, res) => {

    const { companyName, jobTitle, contactEmail, contactNumber, postedDate,
        appliedDate, applyStatus, seenAt, notes } = req.body

    try {

        const newJob = new Job({
            companyName, jobTitle, contactEmail, contactNumber, postedDate,
            appliedDate, applyStatus, seenAt, notes,
            user: req.user.id
        })

        const job = await newJob.save()
        res.json(job)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})


// @route   PUT api/jobs/:id
// @desc    update job
// @access  Private
router.put("/:id", auth, async (req, res) => {

    const { companyName, jobTitle, contactEmail, contactNumber, postedDate,
        appliedDate, applyStatus, seenAt, notes, } = req.body

    //build job object
    const jobDetails = {}
    if (companyName) jobDetails.companyName = companyName
    if (jobTitle) jobDetails.jobTitle = jobTitle
    if (contactEmail) jobDetails.contactEmail = contactEmail
    if (contactNumber) jobDetails.contactNumber = contactNumber
    if (postedDate) jobDetails.postedDate = postedDate
    if (appliedDate) jobDetails.appliedDate = appliedDate
    if (applyStatus) jobDetails.applyStatus = applyStatus
    if (seenAt) jobDetails.seenAt = seenAt
    if (notes) jobDetails.notes = notes

    try {
        let job = await Job.findById(req.params.id)
        if (!job) return res.status(404).json({ msg: "Job not found" })

        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        job = await Job.findByIdAndUpdate(req.params.id, { $set: jobDetails }, { new: true })
        // res.json(job)
        res.json(job)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

// @route   DELETE api/jobs/:id
// @desc    delete job
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let job = await Job.findById(req.params.id)
        if (!job) return res.status(404).json({ msg: "Job not found" })

        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        await Job.findByIdAndRemove(req.params.id)
        res.json({ msg: "Job deleted" })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router
