import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { localizer, messages } from '../../helpers';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from '../';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347cd7',
      borderRadius: '2px',
      opacity: 0.8,
      color: 'white',
    };
    return { style };
  };

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
        style={{ height: 'calc(100vh - 80px)' }}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
