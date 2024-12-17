import React from "react"
import { Box, Button } from "rebass"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store.ts"
import { currentPagination } from "../redux/vehicle/vehicleSlice.ts"

const PAGE_SIZE = 5

const Pagination: React.FC<{
  totalItems: number
  onPageChange: (page: number) => void
}> = ({ totalItems, onPageChange }) => {
  const { currentPage } = useSelector((state: RootState) => state.vehicles)
  const dispatch = useDispatch()
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)

  const handlePageChange = (page: number) => {
    dispatch(currentPagination(page))
    onPageChange(page)
  }

  const handleFirstPage = () => {
    if (currentPage > 1) {
      handlePageChange(1)
    }
  }

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  return (
    <Box mt={3} textAlign="center" p={2}>
      <Button
        variant="outline"
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        bg="#606873"
        mx={1}
      >
        <FiChevronLeft />
      </Button>
      {Array.from({ length: Math.min(totalPages, PAGE_SIZE) }).map(
        (_, index) => (
          <Button
            key={index + 1}
            variant={currentPage === index + 1 ? "primary" : "outline"}
            onClick={() => handlePageChange(index + 1)}
            bg="#606873"
            mx={1}
          >
            {index + 1}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        bg="#606873"
        mx={1}
      >
        <FiChevronRight />
      </Button>
    </Box>
  )
}

export default Pagination
