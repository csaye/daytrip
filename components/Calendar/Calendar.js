import React, { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  const [events, setEvents] = useState([]);

  function createEvent(selectInfo) {}

  function editEvent(eventInfo) {}

  function updateEventTime(eventInfo) {}

  return (
    <div>
      <FullCalendar
        initialView="timeGridDay"
        height="auto"
        events={events}
        plugins={[timeGridPlugin, interactionPlugin]}
        allDaySlot={false}
        selectable={true}
        editable={true}
        eventResizableFromStart={true}
        select={createEvent}
        eventClick={editEvent}
        eventDrop={updateEventTime}
        eventResize={updateEventTime}
      />
    </div>
  );
}
