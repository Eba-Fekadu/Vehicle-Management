import { ReactElement, useEffect } from "react"
import { Box, Flex, Card, Image, Heading, Text } from "rebass"
import VehicleLogo from "../../assets/VehicleLogo.png"
import Pagination from "../../component/Pagination.tsx"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store.ts"
import { currentPagination } from "../../redux/vehicle/vehicleSlice.ts"

interface Vehicle {
  _id: string
  Name: string
  Status: string
}

interface listProps {}
export default function list({}: listProps): ReactElement {
  const { vehicleListing, showListingError, currentPage, searchTerm } =
    useSelector((state: RootState) => state.vehicles)

  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchQuery = urlParams.toString()

    dispatch({ type: "FETCH_VEHICLE_LISTS", payload: searchQuery })
  }, [location.search, searchTerm])

  const onPageChange = (page: number) => {
    dispatch(currentPagination(page))
  }

  const paginatedVehicles = vehicleListing.slice(
    (currentPage - 1) * 8,
    currentPage * 8,
  )
  return (
    <div>
      <Flex flexDirection={["column", "row"]}>
        <Box p={3} sx={{ alignItems: ["center", "flex-start"] }}>
          <p>{showListingError ? "Error showing vehicle listings" : ""}</p>

          <Text fontSize={5} fontWeight="bold" p={3} mb={0} color={"#606873"}>
            VEHICLE LISTS
          </Text>
          <Flex
            flexWrap="wrap"
            justifyContent="space-evenly"
            alignItems="stretch"
            minHeight="100vh"
          >
            {vehicleListing.length > 0 &&
              paginatedVehicles.map((vehicle: Vehicle) => (
                <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} p={3} key={vehicle._id}>
                  <Card
                    sx={{
                      boxShadow: "0 4px 8px 1px rgba(0, 0, 0, 0.8)",
                      backgroundColor: "rgba(54, 69, 79, 0.3)",
                      backdropFilter: "blur(4px)",
                      backdropBlurSm: "blur(4px)",
                      borderRadius: 8,
                      overflow: "hidden",
                      minWidth: "35vh",
                    }}
                  >
                    <Image src={VehicleLogo} width={[1]} />
                    <Box px={2}>
                      <Heading as="h2" px={2} fontSize={[2, 3, 4]}>
                        Vehicle Name:
                        <span
                          style={{
                            color: "rgba(255, 255, 255, 0.4)",
                            paddingLeft: "8px",
                          }}
                        >
                          {vehicle.Name}
                        </span>
                      </Heading>
                      <Text fontSize={[0, 1, 2]} px={2} mb={3} mt={2}>
                        Status:
                        <span
                          style={{
                            color: "rgba(255, 255, 255, 0.4)",
                            paddingLeft: "8px",
                          }}
                        >
                          {vehicle.Status}
                        </span>
                      </Text>
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
