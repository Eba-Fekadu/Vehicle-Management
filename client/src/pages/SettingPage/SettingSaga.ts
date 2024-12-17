import { put, call, delay } from "redux-saga/effects"

import {
  listingErrorStart,
  listingSuccess,
  listingErrorSuccess,
  createFailure,
  updateSuccess,
  updateStart,
  createStart,
  setFormData,
  createSuccess,
  setUpdateFormData,
  successToast,
  updateReturn,
} from "../../redux/vehicle/vehicleSlice.ts"
interface FormData {
  Name: string
  Status: string
}
export function* fetchVehicleListing(): Generator<any, void, any> {
  try {
    yield put(listingErrorStart())
    const response = yield call(fetch, `/server/vehicle/listings`)
    const data = yield response.json()

    if (data.success === false) {
      yield put(listingErrorSuccess())
      return
    }

    yield put(listingSuccess(data))
  } catch (error) {
    yield put(listingErrorSuccess())
    console.error("Error fetching data listing", error)
  }
}

export function* fetchVehicleUpdate(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    yield put(updateStart())
    const res = yield call(fetch, `/server/vehicle/get/${action.payload}`)
    const data = yield res.json()

    if (data.success === false) {
      yield put(createFailure(data.message))
      console.log(data.message)
      return
    }

    yield put(setUpdateFormData(data))
    yield put(updateSuccess(action.payload))
  } catch (error) {
    console.error("Error fetching update listing", error)
  }
}

export function* updateVehicle(action: {
  type: string
  payload: string
  secondPayload: FormData
}): Generator<any, void, any> {
  try {
    yield put(createStart())
    yield new Promise((resolve) => setTimeout(resolve, 1000))
    const res = yield call(fetch, `/server/vehicle/update/${action.payload}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.secondPayload),
    })
    const data = yield res.json()

    if (data.success === false) {
      yield put(createFailure(data.message))
      yield delay(4000)

      yield put(createFailure(""))

      return
    }

    yield put(setFormData({ Name: "" }))

    yield put(createSuccess(data))

    yield put(updateReturn())
    yield call(fetchVehicleListing)
  } catch (error) {
    if (error instanceof Error) {
      yield put(createFailure(error.message))
      yield delay(4000)

      yield put(createFailure(""))
    } else {
      console.error("Unexpected error:", error)
    }
  }
}

export function* fetchVehicleDelete(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this vehicle?",
    )
    if (!userConfirmed) {
      return
    }
    const response = yield call(
      fetch,
      `server/vehicle/delete/${action.payload}`,
      {
        method: "DELETE",
      },
    )
    if (!response.ok) {
      const dataError = yield response.json()
      console.log(dataError.message)
      return
    }
    const data: { success: boolean; message?: string } = yield response.json()

    if (data.success === false) {
      console.log(data.message)
      return
    }
    yield call(fetchVehicleListing)
  } catch (error) {
    console.log((error as Error).message)
  }
}

export function* fetchVehicleSubmit(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    yield put(createStart())
    yield new Promise((resolve) => setTimeout(resolve, 1000))

    const res = yield call(fetch, ` /server/vehicle/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    })
    const data = yield res.json()

    if (data.success === false) {
      yield put(createFailure(data.message))
      yield delay(4000)

      yield put(createFailure(""))

      return
    }

    yield put(setFormData({ Name: "" }))
    yield put(createSuccess(data))
    yield put(successToast(data))
    yield call(fetchVehicleListing)

    yield delay(4000)

    yield put(successToast(""))
  } catch (error) {
    if (error instanceof Error) {
      yield put(createFailure(error.message))
      yield delay(4000)

      yield put(createFailure(""))

      yield put(successToast(""))
    } else {
      console.error("Unexpected error:", error)
    }
  }
}
