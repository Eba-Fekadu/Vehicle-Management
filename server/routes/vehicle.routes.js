import express from "express"
import {
  create,
  deleteVehicle,
  getVehicles,
  updateVehicle,
  getVehicle,
  getSearch,
} from "../controllers/vehicle.controller.js"

const router = express.Router()

router.post("/create", create)
router.get("/listings", getVehicles)
router.delete("/delete/:id", deleteVehicle)
router.post("/update/:id", updateVehicle)
router.get("/get/:id", getVehicle)
router.get("/getSearch", getSearch)

export default router
