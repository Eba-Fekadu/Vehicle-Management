import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FormData {
  Name: string
  Status: string
}

export interface VehicleState {
  formData: FormData
  error: string
  loading: boolean
  isLoading: boolean
  isUpdateMode: boolean
  showListingError: boolean
  updateData: string
  success: string
  currentPage: number
  vehicleListing: []
  searchTerm: string
}

const initialState: VehicleState = {
  formData: {
    Name: "",
    Status: "",
  },
  error: "",
  success: "",
  loading: false,
  isLoading: false,
  isUpdateMode: false,
  showListingError: false,
  updateData: "",
  currentPage: 1,
  vehicleListing: [],
  searchTerm: "",
}

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload }
    },

    setUpdateFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = { ...action.payload }
    },

    successToast: (state, action: PayloadAction<string>) => {
      state.success = action.payload
    },

    createStart: (state) => {
      state.loading = true
    },
    createSuccess: (state) => {
      state.loading = false
      state.error = ""
    },
    createFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    updateStart: (state) => {
      state.isUpdateMode = true
    },

    updateSuccess: (state, action: PayloadAction<string>) => {
      state.updateData = action.payload
      state.loading = false
      state.error = ""
    },
    updateReturn: (state) => {
      state.isUpdateMode = false
    },
    listingErrorStart: (state) => {
      state.showListingError = false
    },
    listingErrorSuccess: (state) => {
      state.showListingError = true
    },
    listingSuccess: (state, action: PayloadAction<[]>) => {
      state.vehicleListing = action.payload
    },
    currentPagination: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    searchState: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const {
  setFormData,
  setUpdateFormData,
  successToast,
  createStart,
  createSuccess,
  createFailure,
  updateStart,
  updateSuccess,
  updateReturn,
  listingErrorStart,
  listingErrorSuccess,
  currentPagination,
  listingSuccess,
  searchState,
} = vehicleSlice.actions

export default vehicleSlice.reducer
