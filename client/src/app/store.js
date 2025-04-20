import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice.js";
import habitReducer from "./slices/habitSlice.js";
import habitLogReducer from "./slices/habitLogSlice.js";
import statsReducer from "./slices/statsSlice.js";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    habits: habitReducer,
    habitLogs: habitLogReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);
