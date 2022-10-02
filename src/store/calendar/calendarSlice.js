import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: state => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          event => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload }) => {
      state.isLoadingEvents = true;
      payload.forEach(event => {
        const eventExist = state.events.some(
          dbEvent => dbEvent._id === event._id
        );
        if (!eventExist) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: state => {
      state.activeEvent = null;
      state.isLoadingEvents = true;
      state.events = [];
    },
  },
});

export const {
  onLoadEvents,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLogoutCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
