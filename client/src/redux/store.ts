import { combineReducers, configureStore } from "@reduxjs/toolkit"
import vehicleReducer from "./vehicle/vehicleSlice.ts"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga.ts"

const rootReducer = combineReducers({ vehicles: vehicleReducer })
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
