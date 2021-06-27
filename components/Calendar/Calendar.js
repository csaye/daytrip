import React, { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import styles from './Calendar.module.css';

export default function Calendar() {
  const [events, setEvents] = useState([]);

  function createEvent(selectInfo) {}

  function editEvent(eventInfo) {}

  function updateEventTime(eventInfo) {}

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
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
    </div>
  );
}
