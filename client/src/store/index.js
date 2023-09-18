import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "../persistedReducer/PersistedReducer";
import { persistStore } from 'redux-persist';

const store=configureStore({
    reducer:persistedReducer,
})
export const persistor = persistStore(store)

export default store