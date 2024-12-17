/** @jsxImportSource @emotion/react */
import React, { ReactElement, ChangeEvent, useEffect } from "react"
import { css } from "@emotion/react"
import { Button, Box, Flex, Card, Image, Text } from "rebass"
import { useSelector, useDispatch } from "react-redux"
import {
  updateReturn,
  setFormData,
  currentPagination,
} from "../../redux/vehicle/vehicleSlice.ts"
import { RootState } from "../../redux/store.ts"
import Pagination from "../../component/Pagination.tsx"
import { FiTrash2, FiEdit2 } from "react-icons/fi"
import VehicleLogo from "../../assets/VehicleLogo.png"

interface SettingProps {}

interface Vehicle {
  _id: string
  Name: string
  Status: string
  updatedAt: Date
}

const inputStyles = css`
  background-color: rgba(54, 69, 79, 0.4);
  display: flex;
  padding: 10px;
  margin: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  color: #fff;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-width: 2px;
    border-color: #a0aec8;
    transition:
      border-color 0.3s ease-in-out,
      border-width 0.3s ease-in-out;
  }
  @media screen and (max-width: 600px) {
    /* Adjust styles for screens with a maximum width of 600px */
    margin: 10px;
    font-size: 14px;
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    /* Adjust styles for screens with a width between 601px and 1024px */
    padding: 8px;
  }
`

export default function Setting({}: SettingProps): ReactElement {
  const {
    formData,
    loading,
    error,
    updateData,
    isUpdateMode,
    vehicleListing,
    showListingError,
    success,
    currentPage,
  } = useSelector((state: RootState) => state.vehicles)

  const dispatch = useDispatch()
  useEffect(() => {
    handleShowListings()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setFormData({ [e.target.id]: e.target.value }))
  }
  const handleReturn = () => {
    dispatch(updateReturn())

    dispatch(
      setFormData({
        Name: "",
        Status: "",
      }),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: "FETCH_VEHICLE_SUBMIT", payload: formData })
  }

  const handleVehicleDelete = async (vehicleId: string) => {
    dispatch({ type: "FETCH_VEHICLE_DELETE", payload: vehicleId })
  }

  const handleVehicleUpdate = async (vehicleId: string) => {
    dispatch({ type: "FETCH_VEHICLE_UPDATE", payload: vehicleId })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({
      type: "VEHICLE_UPDATE",
      payload: updateData,
      secondPayload: formData,
    })
  }

  const handleShowListings = async () => {
    dispatch({ type: "FETCH_VEHICLE_LISTING" })
  }

  const onPageChange = (page: number) => {
    dispatch(currentPagination(page))
  }

  const paginatedVehicles = vehicleListing.slice(
    (currentPage - 1) * 6,
    currentPage * 6,
  )

  return (
    <div>
      <Flex flexDirection={["column", "row"]}>
        <Box
          width={[1, 1 / 3]}
          p={4}
          m={3}
          sx={{ borderRight: "4px solid  rgba(54, 69, 79, 0.4)" }}
        >
          {isUpdateMode ? (
            <Text fontSize={[3, 4, 5]} fontWeight="bold" mb={4} color="#606873">
              UPDATE VEHICLE
            </Text>
          ) : (
            <Text fontSize={[3, 4, 5]} fontWeight="bold" mb={4} color="#606873">
              ADD VEHICLE
            </Text>
          )}

          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={isUpdateMode ? handleUpdate : handleSubmit}>
            <label>Vehicle Name:</label>
            <input
              type="text"
              css={inputStyles}
              placeholder="name"
              id="Name"
              value={formData.Name}
              onChange={handleChange}
            />

            <label>Status:</label>

            <select
              css={inputStyles}
              value={formData.Status}
              id="Status"
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="In Use">In Use</option>
              <option value="Idle">Idle</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Out of Service">Out of Service</option>
              <option value="In Transit">In Transit</option>
              <option value="Damaged">Damaged</option>
              <option value="Retired">Retired</option>
            </select>

            {isUpdateMode ? (
              <Button type="submit" disabled={loading} my={3} bg="#606873">
                {loading ? "Loading..." : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={loading} mt={3} bg="#606873">
                {loading ? "Loading..." : "Add"}
              </Button>
            )}
            {isUpdateMode ? (
              <Button
                onClick={handleReturn}
                mt={2}
                bg="#606873"
                sx={{ display: "block" }}
              >
                Return to Add
              </Button>
            ) : (
              ""
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </Box>
        <Box
          width={[1, 3 / 3]}
          p={3}
          sx={{ alignItems: ["center", "flex-start"] }}
        >
          <p style={{ color: "red" }}>
            {showListingError ? "Error showing vehicle lists" : ""}
          </p>

          <Flex flexWrap="wrap" justifyContent="flex-start">
            {vehicleListing.length > 0 &&
              paginatedVehicles.map((vehicle: Vehicle) => (
                <Box p={3} key={vehicle._id}>
                  <Card
                    sx={{
                      boxShadow: "0 4px 8px 1px rgba(0, 0, 0, 0.8)",
                      backgroundColor: "rgba(54, 69, 79, 0.3)",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image src={VehicleLogo} width={[1]} />
                    <Box px={2}>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Vehicle Name:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {vehicle.Name}
                        </span>
                      </Text>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Status:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {vehicle.Status}
                        </span>
                      </Text>
                      <Text fontSize={[0, 1, 2]} mb={2}>
                        Last Updated:{" "}
                        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                          {new Date(vehicle.updatedAt).toLocaleString(
                            undefined,
                            {
                              dateStyle: "short",
                              timeStyle: "short",
                            },
                          )}
                        </span>
                      </Text>
                      <Flex>
                        <Button
                          onClick={() => handleVehicleDelete(vehicle._id)}
                          variant="outline"
                          color="white"
                          m={1}
                          bg="black"
                          sx={{
                            ":hover": {
                              backgroundColor: "#333",
                              color: "white",
                            },
                          }}
                        >
                          <FiTrash2 /> Delete
                        </Button>
                        <Button
                          onClick={() => handleVehicleUpdate(vehicle._id)}
                          variant="outline"
                          color="white"
                          m={1}
                          bg="black"
                          sx={{
                            ":hover": {
                              backgroundColor: "#555",
                              color: "white",
                            },
                          }}
                        >
                          <FiEdit2 /> Update
                        </Button>
                      </Flex>
                    </Box>
                  </Card>
                </Box>
              ))}
          </Flex>

          <Pagination
            totalItems={vehicleListing.length}
            onPageChange={onPageChange}
          />
        </Box>
      </Flex>
    </div>
  )
}
