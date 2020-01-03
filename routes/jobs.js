const express = require("express")
const router = express.Router()

// @route   GET api/jobs
// @desc    Get all saved job applications
// @access  Private
router.get("/", (req, res) => {
    res.send("Get all jobs")
})

// @route   POST api/jobs
// @desc    Add new job
// @access  Private
router.post("/", (req, res) => {
    res.send("add new application")
})


// @route   PUT api/jobs/:id
// @desc    update job
// @access  Private
router.put("/:id", (req, res) => {
    res.send("update application")
})

// @route   DELETE api/jobs/:id
// @desc    delete job
// @access  Private
router.delete("/:id", (req, res) => {
    res.send("delete application")
})

module.exports = router
