import Vehicle from "../models/vehicle.model.js"

export const create = async (req, res, next) => {
  const { Name, Status } = req.body
  const newVehicle = new Vehicle({ Name, Status })
  try {
    await newVehicle.save()
    res.status(201).json("Vehicle Created Successfully!")
  } catch (error) {
    next(error)
  }
}

export const getVehicles = async (req, res, next) => {
  try {
    const listing = await Vehicle.find(req.body).sort({ createdAt: -1 })

    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

export const deleteVehicle = async (req, res, next) => {
  const listing = await Vehicle.findById(req.params.id)

  try {
    await Vehicle.findByIdAndDelete(req.params.id)
    res.status(200).json("Vehicle has been deleted")
  } catch (error) {
    next(error)
  }
}

export const updateVehicle = async (req, res, next) => {
  const listing = await Vehicle.findById(req.params.id)

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    res.status(200).json(updatedVehicle)
  } catch (error) {
    next(error)
  }
}
export const getVehicle = async (req, res, next) => {
  try {
    const listing = await Vehicle.findById(req.params.id)
    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

export const getSearch = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const searchTerm = req.query.searchTerm || ""

    const listings = await Vehicle.find({
      Status: { $regex: searchTerm, $options: "i" },
    }).skip(startIndex)

    return res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}
