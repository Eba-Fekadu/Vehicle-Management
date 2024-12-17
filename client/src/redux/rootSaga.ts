import { takeLatest } from "redux-saga/effects"
import { fetchVehicleLists } from "../pages/ListPage/ListSaga.ts"
import { fetchVehicleListing } from "../pages/SettingPage/SettingSaga.ts"
import { fetchVehicleUpdate } from "../pages/SettingPage/SettingSaga.ts"
import { updateVehicle } from "../pages/SettingPage/SettingSaga.ts"
import { fetchVehicleDelete } from "../pages/SettingPage/SettingSaga.ts"
import { fetchVehicleSubmit } from "../pages/SettingPage/SettingSaga.ts"

function* watchFetchVehicles() {
  yield takeLatest("FETCH_VEHICLE_LISTS", fetchVehicleLists)
  yield takeLatest("FETCH_VEHICLE_LISTING", fetchVehicleListing)
  yield takeLatest("FETCH_VEHICLE_UPDATE", fetchVehicleUpdate)
  yield takeLatest("VEHICLE_UPDATE", updateVehicle)
  yield takeLatest("FETCH_VEHICLE_DELETE", fetchVehicleDelete)
  yield takeLatest("FETCH_VEHICLE_SUBMIT", fetchVehicleSubmit)
}

export default function* rootSaga() {
  yield watchFetchVehicles()
}
