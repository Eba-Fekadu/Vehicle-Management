import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import vehicleRouter from "./routes/vehicle.routes.js"
import path from "path"
dotenv.config()

mongoose
  .connect(process.env.MONGO)

  .then(() => {
    console.log("connected to MongoDB!")
  })
  .catch((err) => {
    console.log(err)
  })

const __dirname = path.resolve()
const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log("Server is running on port 3000!")
})

app.use("/server/vehicle", vehicleRouter)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
