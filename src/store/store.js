import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendar/calendarSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
