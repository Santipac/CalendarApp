import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { convertDateEvents } from '../helpers';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async calendarEvent => {
    try {
      if (calendarEvent._id) {
        await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log(data);
      dispatch(
        onAddNewEvent({ ...calendarEvent, _id: data.savedEvent._id, user })
      );
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertDateEvents(data.listEvents);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent._id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
    startDeletingEvent,
  };
};
