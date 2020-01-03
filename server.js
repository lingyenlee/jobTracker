const express = require("express")
const app = express()
const connectDB = require("./config/db")

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Connected to ${PORT}`))

//init middleware (bodyparser)
app.use(express.json({ extended: false }))

//connect to DB
connectDB()

// //test get api
// app.get("/", (req, res) => {
//     res.json({ msg: "Hello" })
// })

//define routes
app.use("/api/users", require("./routes/users"))
app.use("/api/jobs", require("./routes/jobs"))
app.use("/api/auth", require("./routes/auth"))


