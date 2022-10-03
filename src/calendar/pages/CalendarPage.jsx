import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { localizer, messages } from '../../helpers';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from '../';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvent ? '#347cd7' : '#465660',
      borderRadius: '2px',
      opacity: 0.8,
      color: 'white',
    };
    return { style };
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const onDoubleClick = event => {
    // console.log({ doubleClick: event });
    openDateModal();
  };
  const onSelected = event => {
    console.log({ click: event });
    setActiveEvent(event);
  };
  const onViewChanged = event => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        className="p-2"
        messages={messages}
        culture="es"
        defaultView={lastView}
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelected}
        onView={onViewChanged}
        style={{ height: '89vh' }}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
