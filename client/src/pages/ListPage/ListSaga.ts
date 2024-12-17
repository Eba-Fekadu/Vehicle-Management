import { put, call } from "redux-saga/effects"
import {
  listingSuccess,
  listingErrorStart,
} from "../../redux/vehicle/vehicleSlice" // Import your action creator

export function* fetchVehicleLists(action: {
  type: string
  payload: string
}): Generator<any, void, any> {
  try {
    const res = yield call(fetch, `/server/vehicle/getSearch?${action.payload}`)
    const data = yield res.json()

    yield put(listingSuccess(data))
  } catch (error) {
    yield put(listingErrorStart())
  }
}
