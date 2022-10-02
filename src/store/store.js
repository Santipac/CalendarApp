import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import calendarReducer from './calendar/calendarSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
